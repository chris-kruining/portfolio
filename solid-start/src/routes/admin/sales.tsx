import { A, RouteSectionProps } from '@solidjs/router';

export default function Sales(props: RouteSectionProps) {
    return (
        <div class="grid grid-rows-[auto_auto_1fr] grid-cols-[100%] gap-4">
            <h1 class="font-bold text-2xl">Sales</h1>

            <nav class="grid grid-flow-col justify-start sticky top-0 z-10 gap-4 -px-2 mx-2 border-b border-neutral-100 bg-neutral-50">
                <A class="p-4 [&.active]:bg-neutral-100" href="/admin/sales" end>
                    Overview
                </A>
                <A class="p-4 [&.active]:bg-neutral-100" href="/admin/sales/subscriptions">
                    Subscriptions
                </A>
                <A class="p-4 [&.active]:bg-neutral-100" href="/admin/sales/invoices">
                    Invoices
                </A>
                <A class="p-4 [&.active]:bg-neutral-100" href="/admin/sales/customers">
                    Customers
                </A>
                <A class="p-4 [&.active]:bg-neutral-100" href="/admin/sales/deposits">
                    Deposits
                </A>
            </nav>

            <main>{props.children}</main>
        </div>
    );
}
