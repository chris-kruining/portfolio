import { RouteSectionProps, cache, createAsync, A } from "@solidjs/router";
import styles from './invoices.module.css';
import { createMemo } from "solid-js";

type DiscriminatedUnion<K extends PropertyKey, T extends object> = {
    [P in keyof T]: ({ [Q in K]: P } & T[P]) extends infer U ? { [Q in keyof U]: U[Q] } : never
}[keyof T];

type Due = DiscriminatedUnion<'status', {
    'paid': {},
    'overdue': {},
    'dueToday': {},
    'dueInDays': { dueInDays: number },
    'dueInYears': { dueInYears: number },
}>;

interface Invoice {
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

const getInvoices = cache(async () => {
    "use server";

    const invoices = (await import('../../../../../shared/invoices.json')).default.map((i: Invoice) => ({ ...i, due: new Date(i.due)}));

    return invoices as Invoice[];
}, 'invoices');

export const route = {
    load: () => getInvoices(),
};

export default function Invoices({ children }: RouteSectionProps) {
    const invoices = createAsync<Invoice[]>(getInvoices);

    const shown = createMemo(() => {
        return invoices()?.slice(0, 5) ?? [];
    });

    const totalOverDue = createMemo(() => {
        return invoices()?.filter(i => i.status.status === 'overdue').reduce((t, i) => t + i.price.value, 0) ?? 0;
    });

    console.log(invoices(), );

    return <div class={styles.host}>
        <h2>Total due</h2>

        <header>
            <span>overdue</span>
            <p>{totalOverDue()}</p>
        </header>

        <h3>Invoices</h3>

        <nav>
            {shown().map(i => <A href={`/sales/invoices/${i.id}`}>
                <strong place>{i.place}</strong>
                <strong price>{i.price.value}</strong>
                <span year>{i.due.getFullYear()}</span>
                <span due={i.status.status}>{renderSwitch(i.status)}</span>
            </A>)}
        </nav>

        <main>
            {children}
        </main>
    </div>;
}

function renderSwitch(due: Due) {
    switch (due.status) {
        case 'paid': return 'paid';
        case 'overdue': return 'overdue';
        case 'dueToday': return 'due today';
        case 'dueInDays': return `due in ${due.dueInDays} days`;
        case 'dueInYears': return `due in ${due.dueInYears} years`;
    }
}