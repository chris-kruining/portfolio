import { z } from 'zod';

export const due = z.discriminatedUnion('status', [
    z.object({ status: z.literal('paid') }),
    z.object({ status: z.literal('overdue') }),
    z.object({ status: z.literal('dueToday') }),
    z.object({ status: z.literal('dueInDays'), dueInDays: z.number() }),
    z.object({ status: z.literal('dueInYears'), dueInYears: z.number() }),
]);

export const invoice = z.object({
    id: z.number(),
    place: z.string(),
    price: z.object({
        value: z.number(),
        currency: z.enum(['EUR', 'JPY', 'USD']),
    }),
    paid: z.boolean(),
    due: z.date(),
    status: due,
});

export type Due = z.infer<typeof due>;
export type Invoice = z.infer<typeof invoice>;