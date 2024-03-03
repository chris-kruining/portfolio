'use server';

import { delay } from '~/utilities/promises';
import { createStorage } from '~/utilities/storage';

export type Board = {
    id: number;
    title: string;
};

type NormalizedBoad = Omit<Board, 'columns'>;

const storage = await createStorage<Board>({
    key: 'boards',
    seed: [{ id: 1, title: 'board 1' }],
});

export const list = async () => {
    return await storage.list();
};

export const get = async (id: number): Promise<Board | undefined> => {
    return storage.get({ id });
};

export const create = async (board: Omit<Board, 'id'>) => {
    const boards = await list();
    const id = boards.length;

    await delay(4000);

    return storage.create({ ...board, id });
};

export const update = async (id: number, next: Omit<NormalizedBoad, 'id'>) => {
    return storage.update({ id }, { ...next, id });
};

export const remove = async (id: number) => {
    await storage.remove({ id });
};
