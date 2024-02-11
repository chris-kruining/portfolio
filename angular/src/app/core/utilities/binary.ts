import { z, ZodDate, ZodNumber, ZodBoolean, ZodString, ZodObject, ZodDiscriminatedUnion, ZodEnum, ZodArray, ZodTypeAny, ZodLiteral } from "zod";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export async function serialize<T extends ZodTypeAny>(schema: T, data: z.infer<T>|undefined): Promise<ArrayBuffer> {
    let accumulation = new Uint8Array();

    if (data !== undefined) {
        for await (const k of _serialize(schema, data, '')) {
            accumulation = concatTypedArrays(accumulation, k);
        }
    }

    return accumulation.buffer;
}

export async function deserialize<T extends ZodTypeAny>(schema: T, data: ArrayBuffer): Promise<z.infer<T>> {
    return await _deserialize(schema, data, { offset: 0 }, '');
}

async function* _serialize<T extends ZodTypeAny>(schema: T, data: z.infer<T>, path: string): AsyncGenerator<Uint8Array, void, unknown> {    
    if (schema instanceof ZodObject) {
        for (const [ key, type ] of Object.entries(schema.shape)) {
            yield* _serialize(type as ZodTypeAny, data[key], `${path}.${key}`);
        }
    }
    else if (schema instanceof ZodArray) {
        yield encodeNumber(data.length);

        for(const [ i, item ] of data.entries()) {
            yield* _serialize((schema as ZodArray<ZodTypeAny>).element, item, `${path}[${i}]`);
        }
    }
    else if (schema instanceof ZodDate) {
        const encoded = data.toJSON();

        yield encodeString(encoded);
    }
    else if (schema instanceof ZodNumber) {
        yield encodeNumber(data);
    }
    else if (schema instanceof ZodBoolean) {
        yield new Uint8Array([ data ]);
    }
    else if (schema instanceof ZodString) {
        yield encodeString(data);
    }
    else if (schema instanceof ZodDiscriminatedUnion) {
        const key = data[schema.discriminator];
        const index = Array.from(schema.optionsMap.keys()).indexOf(key);
        const type = schema.options[index];

        yield encodeNumber(index);
        yield* _serialize(type, data, path);
    }
    else if (schema instanceof ZodEnum) {
        yield encodeString(data);
    }
    else if (schema instanceof ZodLiteral) {
        // no need to encode literals the value is know during deseralization
    }
    else {
        console.log('__UNKNOWN__', schema, data);
    }
}

type Cursor = { offset: number };
async function _deserialize<T extends ZodTypeAny>(schema: T, data: ArrayBuffer, cursor: Cursor, path: string): Promise<T> {    
    if (schema instanceof ZodObject) {
        return Object.fromEntries(
            await mapAsync(
                Object.entries(schema.shape), 
                async ([ key, type ]) => [ key, await _deserialize(type as ZodTypeAny, data, cursor, `${path}.${key}`) ]
            )
        ) as unknown as T;
    }
    else if (schema instanceof ZodArray) {
        const length = getNumber(data, cursor);
        const result = new Array(length);

        for(let i = 0; i < length; i++) {
            result[i] = await _deserialize(schema.element, data, cursor, `${path}[${i}]`);
        }

        return result as unknown as T;
    }
    else if (schema instanceof ZodDate) {
        return new Date(getString(data, cursor)) as unknown as T;
    }
    else if (schema instanceof ZodNumber) {
        return getNumber(data, cursor) as unknown as T;
    }
    else if (schema instanceof ZodBoolean) {
        return getBool(data, cursor) as unknown as T;
    }
    else if (schema instanceof ZodString) {
        return getString(data, cursor) as unknown as T;
    }
    else if (schema instanceof ZodDiscriminatedUnion) {
        const index = getNumber(data, cursor);
        const type = schema.options[index];

        return await _deserialize(type, data, cursor, path) as unknown as T;
    }
    else if (schema instanceof ZodEnum) {
        return getString(data, cursor) as unknown as T;
    }
    else if (schema instanceof ZodLiteral) {
        return schema.value as unknown as T;
    }

    return undefined as unknown as T;
}




function getString(data: ArrayBuffer, cursor: Cursor): string {
    return textDecoder.decode(consume(data, cursor, getNumber(data, cursor)));
}

function encodeNumber(value: number): Uint8Array {
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, value, true);

    return new Uint8Array(view.buffer);
}

function encodeString(value: string): Uint8Array {
    return new Uint8Array([ ...encodeNumber(value.length), ...textEncoder.encode(value) ]);
}

function getNumber(data: ArrayBuffer, cursor: Cursor): number {
    return consume(data, cursor, 4).getUint32(0, true);
}

function getBool(data: ArrayBuffer, cursor: Cursor): boolean {
    return consume(data, cursor, 1).getUint8(0) !== 0;
}

function consume(data: ArrayBuffer, cursor: Cursor, length: number): DataView {
    const result = new DataView(data, cursor.offset, length);

    cursor.offset += length;

    return result;
}

function peek<T = void>(cursor: Cursor, callback: () => T): T {
    const offset = cursor.offset;
    const result = callback();

    cursor.offset = offset;

    return result;
}

function concatTypedArrays(a: Uint8Array, b: Uint8Array) { // a, b TypedArray of same type
    const c = new Uint8Array(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);

    return c;
}

async function mapAsync<I, O>(source: I[], callbackFn: (item: I) => Promise<O>): Promise<O[]> {
    return await source.reduce<Promise<O[]>>(async (accumulator, item) => {
        const acc = await accumulator;
        acc.push(await callbackFn(item));
        return acc;
    }, Promise.resolve([]));
}