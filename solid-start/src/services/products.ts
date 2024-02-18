import p from '../../../shared/data/products.json';
import props from '../../../shared/data/products/properties.json';
import b from '../../../shared/data/brands.json';
import type { Brand } from './brands';

const products = p.map(p => {
    const properties = p.properties.map(propId => props.find(p => p.id === propId)!);
    const price: Price = { value: p.price.value, currency: p.price.currency as Price['currency'] };
    
    const product: Product<typeof properties> = {
        ...p,
        price,
        brand: b.find(b => b.id === p.brand)!, 
        properties,
    } as const;

    return product
});

export const list = async () => {
    "use server";
    
    return products;
};

export const get = async (id: Product<any>['id']) => {
    "use server";
    
    return products.find(p => p.id === id);
};




export interface Price {
    value: number;
    currency: 'EUR'|'USD'|'JPY'
}

export type Variation<P extends readonly Property[] = readonly Property[]> = Record<P[number]['name'], any>;

interface Property {
    id: number;
    name: string;
}

export interface Product<Props extends readonly Property[]> {
    id: number;
    name: string;
    description: string;
    image: string;
    brand: Brand;
    price: Price;
    properties: Props;
    variations: readonly Variation<Props>[];
}