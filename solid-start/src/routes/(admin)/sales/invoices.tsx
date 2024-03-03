import { RouteSectionProps, cache, createAsync, A, RouteDefinition } from "@solidjs/router";
import styles from './invoices.module.css';
import { createMemo, For, Match, Switch } from "solid-js";
import { list } from "~/services/invoices";

const getInvoices = cache(list, 'invoices');

export const route = {
    load: () => createAsync(() => getInvoices()),
} satisfies RouteDefinition;

export default function Invoices(props: RouteSectionProps<ReturnType<typeof route['load']>>) {
    const invoices = props.data!;

    const shown = createMemo(() => {
        return invoices()?.slice(0, 5) ?? [];
    });

    const totalOverDue = createMemo(() => {
        return invoices()?.filter(i => i.status.status === 'overdue').reduce((t, i) => t + i.price.value, 0) ?? 0;
    });

    return <div class={styles.host}>
        <h2>Total due</h2>

        <header>
            <span>overdue</span>
            <p>{totalOverDue()}</p>

            <A href="/sales/invoices/new" >Add new invoice</A>
        </header>

        <h3>Invoices</h3>

        <nav>
            <For each={shown()}>
                {i => <A href={`/sales/invoices/${i.id}`} end>
                    <strong place>{i.place}</strong>
                    <strong price>{i.price.value}</strong>
                    <span year>{i.due.getFullYear()}</span>
                    <span due={i.status.status}>
                        <Switch>
                            <Match when={i.status.status === 'paid' && i.status}>
                                paid
                            </Match>

                            <Match when={i.status.status === 'overdue' && i.status}>
                                overdue
                            </Match>

                            <Match when={i.status.status === 'dueToday' && i.status}>
                                due today
                            </Match>

                            <Match when={i.status.status === 'dueInDays' && i.status}>
                                {(due) => <>due in {due().dueInDays} days</>}
                            </Match>

                            <Match when={i.status.status === 'dueInYears' && i.status}>
                                {(due) => <>due in {due().dueInYears} days</>}
                            </Match>
                        </Switch>
                    </span>
                </A>}
            </For>
        </nav>

        <main>
            {props.children}
        </main>
    </div>;
}