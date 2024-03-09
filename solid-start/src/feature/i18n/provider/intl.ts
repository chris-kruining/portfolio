import { Accessor, createMemo } from 'solid-js';
import { Branch, Key, Context, Locale, Entry, Dictionary, Translation } from '../types';

export const createProvider = <Definition extends Branch>(locale: Accessor<Locale>) => {
    const formatter = createMemo(() => {
        return Intl.NumberFormat(locale(), { style: 'currency', currency: 'EUR' });
    });

    const number = (value: number, options?: NumberFormatOptions) => {
        // const formatter = Intl.NumberFormat(locale(), options as any);

        return formatter().format(value);
    };

    return {
        number,
        translate: (key: Key<Definition>, context: Context<Definition>) => {
            const translation = access(key, context.dictionary);

            if (typeof translation === 'string') {
                return translation;
            } else if (typeof translation === 'function') {
                return translation({ number }, ...context.args);
            }

            return `"${key}" ${context.locale}`;
        },
    };
};

const access = <Definition extends Branch>(key: Key<Definition>, dictionary: Dictionary<Definition>): Translation => {
    const path = key.split('.');

    let entry = dictionary.items as Entry;

    for (const k of path) {
        if (entry === undefined || typeof entry !== 'object' || Object.hasOwn(entry, k) === false) {
            throw new Error(`unable to resolve key '${key}' for locale '${dictionary.locale}'`);
        }

        entry = (entry as Branch)[k];
    }

    return entry as Translation;
};
