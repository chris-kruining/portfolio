import { A, RouteSectionProps  } from '@solidjs/router';
import styles from './(shell).module.css';

export default function Shell({ children }: RouteSectionProps) {
    return <div class={styles.host}>
        <nav>
            <header>
                <img width="40" alt="Analog Logo" src="/images/logo.svg" />
                <span>SolidStart</span>
            </header>

            <section>
                <A href="/" end>Dashboard</A>
                <A href="/accounts">Accounts</A>
                <A href="/sales">Sales</A>
                <A href="/expenses">Expenses</A>
                <A href="/reports">Reports</A>
            </section>
        </nav>

        <main>
            { children }
        </main>
    </div>
}