import * as unstorage from 'unstorage';
import fsLiteDriver from 'unstorage/drivers/fs-lite';

export type StorageOptions<T> = {
    key: string;
    seed?: T[];
};

export const createStorage = async <T extends object>({ key, ...options }: StorageOptions<T>) => {
    const storage = unstorage.createStorage<T[]>({
        driver: fsLiteDriver({ base: './tmp' }),
    });

    if (!(await storage.hasItem(key))) {
        await storage.setItem(key, options.seed ?? []);
    }

    const createFilter = (filter: Partial<T>) => {
        const f = Object.entries(filter) as [keyof T, T[keyof T]][];

        return (item: T) => f.every(([k, v]) => item[k] === v);
    };

    const list = async (filter?: Partial<T>): Promise<T[]> => {
        const items = (await storage.getItem(key))!;
        return filter !== undefined ? items.filter(createFilter(filter)) : items;
    };

    const get = async (filter: Partial<T>): Promise<T | undefined> => {
        const f = createFilter(filter);

        return (await list()).find((item) => f(item));
    };

    const create = async (item: T): Promise<T> => {
        await storage.setItem(key, [...(await list()), item]);

        return item;
    };

    const update = async (filter: Partial<T>, next: Partial<T>): Promise<void> => {
        const items = await list();
        const existing = items.find(createFilter(filter));

        if (existing === undefined) {
            throw new Error(`Value '${JSON.stringify(filter)}' does not exist in store`);
        }

        await storage.setItem(key, items.with(items.indexOf(existing), { ...existing, ...next }));
    };

    const remove = async (filter: Partial<T>): Promise<void> => {
        const f = createFilter(filter);
        const items = await list();

        await storage.setItem(
            key,
            items.filter((item) => f(item) === false),
        );
    };

    return { list, get, create, update, remove };
};
