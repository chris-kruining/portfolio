'use server';

import { createStorage } from '~/utilities/storage';

export type Card = {
    id: number;
    title: string;
    columnId: number;
};

const storage = await createStorage<Card>({
    key: 'cards',
    seed: [
        { id: 1, title: 'feature: Login', columnId: 1 },
        { id: 2, title: 'feature: Ecommerce', columnId: 1 },
        { id: 3, title: 'bug: User avatar', columnId: 1 },
        { id: 4, title: 'bug: Product variations', columnId: 2 },
        { id: 5, title: 'feature: Admin dashboard', columnId: 3 },
        { id: 6, title: 'bug: Invoice summary', columnId: 3 },
    ],
});

export const list = async () => {
    return await storage.list();
};

export const get = async (id: number) => {
    return storage.get({ id });
};

export const getByColumnId = async (columnId: number): Promise<Card[]> => {
    return storage.list({ columnId });
};

export const create = async (card: Omit<Card, 'id'>): Promise<Card> => {
    const items = await storage.list();
    const id = items.reduce((max, i) => Math.max(max, i.id), -1) + 1;

    return await storage.create({ ...card, id });
};

export const update = async (id: number, card: Omit<Card, 'id'>) => {
    return await storage.update({ id }, { ...card, id });
};

export const remove = async (id: number): Promise<void> => {
    await storage.remove({ id });
};

export const removeByColumnId = async (columnId: number): Promise<void> => {
    await storage.remove({ columnId });
};
