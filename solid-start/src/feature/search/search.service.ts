import { list } from '~/feature/shop/product.service';

export const query = async (query: string) => {
    'use server';

    if (query.length === 0) {
        return [];
    }

    const products = await list();
    const q = query.toLowerCase();

    return products.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)).map(p => ({ url: `/shop/${p.id}`, label: p.title }));
};