import b from '../../../../shared/data/brands.json';

export const brands = b as Brand[];

export const get = async (id: number) => {
    'use server';

    return brands.find(b => b.id === id);
}

export const list = async (id: number) => {
    'use server';

    return brands;
}

export interface Brand {
    id: number;
    name: string;
}