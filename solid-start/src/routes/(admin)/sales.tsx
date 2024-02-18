import { A, RouteSectionProps } from "@solidjs/router";
import styles from './sales.module.css'

export default function Sales(props: RouteSectionProps) {
    return <div class={styles.host}>
        <h1>Sales</h1>

        <nav>
            <A href="/sales" end>Overview</A>
            <A href="/sales/subscriptions">Subscriptions</A>
            <A href="/sales/invoices">Invoices</A>
            <A href="/sales/customers">Customers</A>
            <A href="/sales/deposits">Deposits</A>
        </nav>

        <main>
            {props.children}
        </main>
    </div>;
}