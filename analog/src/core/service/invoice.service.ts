import { z } from 'zod';

const delayFor = (milliseconds: number) => new Promise(res => setTimeout(res, milliseconds));
const slowNetwork = 500;

export const list = async (): Promise<readonly Invoice[]> => {
    await delayFor(slowNetwork);

    return invoices;
}

export const get = async (id: Invoice['id']): Promise<Invoice|undefined> => {
    await delayFor(slowNetwork);
    
    return invoices.find(i => i.id === id);
}

export const due = z.discriminatedUnion('status', [
    z.object({ status: z.literal('paid') }),
    z.object({ status: z.literal('overdue') }),
    z.object({ status: z.literal('dueToday') }),
    z.object({ status: z.literal('dueInDays'), dueInDays: z.number().int() }),
    z.object({ status: z.literal('dueInYears'), dueInYears: z.number().int() }),
]);

export const invoice = z.object({
    id: z.number().int().nonnegative(),
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

function dueStatus(invoice: Invoice, pivot: Date|undefined = undefined): Due {
    if(invoice.paid)
    {
        return { status: 'paid' };
    }

    pivot ??= new Date(Date.now());

    const diff = invoice.due.getTime() - pivot.getTime();

    if (Math.sign(diff) < 0) {
        return { status: 'overdue' };
    }

    if (Math.sign(diff) === 0) {
        return { status: 'dueToday' };
    }

    const dueInDays = Math.floor(diff / (1000 * 3600 * 24));

    if (dueInDays < 365) {
        return { status: 'dueInDays', dueInDays };
    }

    return { status: 'dueInYears', dueInYears: Math.floor(dueInDays / 365) };
}

const invoices: readonly Invoice[] = [
    { id: 1 , place: 'Zaltbommel', price: { value: 1_000_123, currency: 'EUR' }, paid: false, due: new Date(Date.parse('2015-11-17')), get status(){ return dueStatus(this) } },
    { id: 2 , place: 'Zaltbommel', price: { value: 1_456_000, currency: 'JPY' }, paid: false, due: new Date(Date.parse('2019-01-22')), get status(){ return dueStatus(this) } },
    { id: 3 , place: 'Zaltbommel', price: { value: 1_123_456, currency: 'USD' }, paid: true,  due: new Date(Date.parse('2020-08-11')), get status(){ return dueStatus(this) } },
    { id: 4 , place: 'Zaltbommel', price: { value: 4_321_000, currency: 'EUR' }, paid: false, due: new Date(Date.parse('2023-08-22')), get status(){ return dueStatus(this) } },
    { id: 5 , place: 'Zaltbommel', price: { value: 1_000_000, currency: 'USD' }, paid: false, due: new Date(Date.parse('2024-02-05')), get status(){ return dueStatus(this) } },
    { id: 6 , place: 'Zaltbommel', price: { value: 1_000_000, currency: 'EUR' }, paid: true,  due: new Date(Date.parse('2013-10-22')), get status(){ return dueStatus(this) } },
    { id: 7 , place: 'Zaltbommel', price: { value: 4_321_000, currency: 'USD' }, paid: true,  due: new Date(Date.parse('2016-09-16')), get status(){ return dueStatus(this) } },
    { id: 8 , place: 'Zaltbommel', price: { value: 1_000_123, currency: 'EUR' }, paid: false, due: new Date(Date.parse('2018-10-19')), get status(){ return dueStatus(this) } },
    { id: 9 , place: 'Zaltbommel', price: { value: 1_000_000, currency: 'JPY' }, paid: false, due: new Date(Date.parse('2023-05-29')), get status(){ return dueStatus(this) } },
    { id: 10, place: 'Zaltbommel', price: { value: 4_321_000, currency: 'EUR' }, paid: true,  due: new Date(Date.parse('2024-02-06')), get status(){ return dueStatus(this) } },
    { id: 11, place: 'Zaltbommel', price: { value: 1_456_000, currency: 'JPY' }, paid: false, due: new Date(Date.parse('2018-02-28')), get status(){ return dueStatus(this) } },
] as const;
