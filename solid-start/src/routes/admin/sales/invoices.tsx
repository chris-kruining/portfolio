import { RouteSectionProps, cache, createAsync, A, RouteDefinition } from '@solidjs/router';
import { createMemo, For, Match, Switch } from 'solid-js';
import { useI18n } from '~/i18n.context';
import { list } from '~/services/invoices';

const getInvoices = cache(list, 'invoices');

export const route = {
    load: () => createAsync(() => getInvoices()),
} satisfies RouteDefinition;

export default function Invoices(props: RouteSectionProps<ReturnType<(typeof route)['load']>>) {
    const invoices = props.data!;

    const { t } = useI18n();

    const shown = createMemo(() => {
        return invoices()?.slice(0, 5) ?? [];
    });

    const totalOverDue = createMemo(() => {
        return (
            invoices()
                ?.filter((i) => i.status.status === 'overdue')
                .reduce((t, i) => t + i.price.value, 0) ?? 0
        );
    });

    return (
        <div class="grid grid-rows-[auto_auto_1fr] grid-cols-[20em_1fr]">
            <h2 class="col-span-2">Total due</h2>

            <header class="col-span-2">
                <span>overdue</span>
                <p>{totalOverDue()}</p>

                <A href="/admin/sales/invoices/new">Add new invoice</A>
            </header>

            <h3 class="col-span-2">Invoices</h3>

            <nav class="grid grid-flow-row justify-start grid-cols-[100%] w-full border-2 border-neutral-200 rounded-l py-4 gap-y-3">
                <For each={shown()}>
                    {(i) => (
                        <A
                            class="grid grid-rows-2 grid-cols-2 p-4 gap-2 [&.active]:bg-neutral-200 [&.active]:font-bold"
                            href={`/admin/sales/invoices/${i.id}`}
                            end
                        >
                            <strong>{i.place}</strong>
                            <strong class="justify-self-end">{t('price', i.price.value, i.price.currency)}</strong>
                            <span>{i.due.getFullYear()}</span>
                            <span
                                class={`justify-self-end uppercase ${
                                    { paid: 'text-green-500', overdue: 'text-red-500' }[i.status.status] ?? ''
                                }`}
                            >
                                <Switch>
                                    <Match when={i.status.status === 'paid' && i.status}>paid</Match>

                                    <Match when={i.status.status === 'overdue' && i.status}>overdue</Match>

                                    <Match when={i.status.status === 'dueToday' && i.status}>due today</Match>

                                    <Match when={i.status.status === 'dueInDays' && i.status}>
                                        {(due) => <>due in {due().dueInDays} days</>}
                                    </Match>

                                    <Match when={i.status.status === 'dueInYears' && i.status}>
                                        {(due) => <>due in {due().dueInYears} days</>}
                                    </Match>
                                </Switch>
                            </span>
                        </A>
                    )}
                </For>
            </nav>

            <main class="grid grid-flow-col justify-start border-2 border-neutral-200 border-l-0 rounded-r p-4">
                {props.children}
            </main>
        </div>
    );
}
