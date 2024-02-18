import invoicesRaw from '../../../shared/data/invoices.json';

const invoices: Invoice[] = invoicesRaw.map((i: any) => ({ ...i, due: new Date(i.due) })).map((i: any) => ({ ...i, status: dueStatus(i) }));

export const get = async (id: number) => {
    "use server";

    // await new Promise(res => setTimeout(res, 1000));

    const invoice = invoices.find(i => i.id === id);

    if(invoice === undefined) {
        throw new Error('not found');
    }

    return invoice;
};

export const list = async () => {
    "use server";

    // await new Promise(res => setTimeout(res, 1000));

    return invoices;
};

let id = invoices.at(-1)!.id;
export const create = async (data: FormData) => {
    "use server";
    
    id++;

    const someInput = data.get('someInput');

    console.log({ data, someInput });

    return {
        id
    };
}

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



type DiscriminatedUnion<K extends PropertyKey, T extends object> = {
    [P in keyof T]: ({ [Q in K]: P } & T[P]) extends infer U ? { [Q in keyof U]: U[Q] } : never
}[keyof T];

export type Due = DiscriminatedUnion<'status', {
    'paid': {},
    'overdue': {},
    'dueToday': {},
    'dueInDays': { dueInDays: number },
    'dueInYears': { dueInYears: number },
}>;

export interface Invoice {
    id: number,
    place: string,
    price: {
        value: number,
        currency: 'EUR'|'JPY'|'USD',
    },
    paid: boolean,
    due: Date,
    status: Due,
}