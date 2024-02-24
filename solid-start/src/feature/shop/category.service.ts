import c from '../../../../shared/data/categories.json';

export const categories = c as Category[];

export interface Category {
    id: number,
    name: string,
    image: string,
}

export const list = async (): Promise<Category[]> => {
    'use server';

    return categories;
}