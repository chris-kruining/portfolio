import { z } from 'zod';

export const CONTENT_TYPE = {
    product: 'application/shop-product'
} as const;

export const INTENT = {
    addToCard: 'addToCard'
} as const;

export const identifier = z.number().positive().finite();

export const cardMutationSchema = z.object({
    productId: identifier,
    quantity: z.number().min(1).max(100),
    variations: z.object({}).array(),
});

export type CardMutation = z.infer<typeof cardMutationSchema>;

type ConstructorToType<T> = T extends typeof String ?
    string
    : T extends typeof Number ?
    number
    : T;

export type MutationFromFields<T extends Record<string, any>> = {
    [K in keyof T]: ConstructorToType<T[K]['type']>;
};