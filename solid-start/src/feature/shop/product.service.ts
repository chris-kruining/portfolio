import p from '../../../../shared/data/products.json';
import props from '../../../../shared/data/products/properties.json';
import { brands, Brand } from './brand.service';
import { categories, Category } from './category.service';

const products = p.map(p => {
    const properties = p.properties.map(propId => props.find(p => p.id === propId)!);
    const price: Price = { value: p.price.value, currency: p.price.currency as Price['currency'] };

    const product: Product<typeof properties> = {
        ...p,
        price,
        brand: brands.find(b => b.id === p.brand)!,
        category: categories.find(b => b.id === p.category)!,
        properties,
    } as const;

    return product
});

export const list = async (limit: number = 100, offset: number = 0) => {
    'use server';

    return products.slice(offset, limit);
};

export const get = async (id: Product<any>['id']) => {
    'use server';

    return products.find(p => p.id === id);
};




export interface Price {
    value: number;
    currency: 'EUR' | 'USD' | 'JPY'
}

export type Variation<P extends readonly Property[] = readonly Property[]> = Record<P[number]['name'], any>;

interface Property {
    id: number;
    name: string;
}

export interface Product<Props extends readonly Property[]> {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    brand: Brand;
    category: Category;
    price: Price;
    properties: Props;
    variations: readonly Variation<Props>[];
}