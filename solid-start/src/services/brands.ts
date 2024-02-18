import b from '../../../shared/data/brands.json';

const brands = b as Brand[];

export const get = async (id: number) => {
    "use server";
    
    return brands.find(b => b.id === id);
}

export interface Brand {
    id: number;
    name: string;
}