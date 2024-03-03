'use server';

import { delay } from '~/utilities/promises';
import { createStorage } from '~/utilities/storage';

export type Column = {
    id: number;
    title: string;
    boardId: number;
};

const storage = await createStorage<Column>({
    key: 'columns',
    seed: [
        { id: 1, title: '1.0.0 :: Initial release', boardId: 1 },
        { id: 2, title: '1.1.0 :: Feature milestone', boardId: 1 },
        { id: 3, title: '1.2.0 :: Some fancy stuff', boardId: 1 },
    ],
});

export const list = async (): Promise<Column[]> => {
    return await storage.list();
};

export const get = async (id: number): Promise<Column | undefined> => {
    return storage.get({ id });
};

export const getByBoardId = async (boardId: number): Promise<Column[]> => {
    return await storage.list({ boardId });
};

export const create = async (column: Omit<Column, 'id'>) => {
    const columns = await list();
    const id = columns.length;

    await delay(1000);

    return storage.create({ ...column, id });
};

export const update = async (id: number, column: Pick<Column, 'title'>) => {
    return storage.update({ id }, column);
};

export const remove = async (id: number) => {
    await storage.remove({ id });
};

export const removeByBoardId = async (boardId: number): Promise<void> => {
    await storage.remove({ boardId });
};
