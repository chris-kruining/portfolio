import { RouteSectionProps } from "@solidjs/router";
import styles from './sales.module.css'

export default function Sales({ children }: RouteSectionProps) {
    return <div class={styles.host}>
        <h1>Sales</h1>

        <nav>
            <a href="/sales">Overview</a>
            <a href="/sales/subscriptions">Subscriptions</a>
            <a href="/sales/invoices">Invoices</a>
            <a href="/sales/customers">Customers</a>
            <a href="/sales/deposits">Deposits</a>
        </nav>

        <main>
            {children}
        </main>
    </div>;
}