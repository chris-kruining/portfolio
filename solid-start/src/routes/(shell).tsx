import { RouteSectionProps  } from '@solidjs/router';
import styles from './(shell).module.css';

export default function Shell({ children }: RouteSectionProps) {
    return <div class={styles.host}>
        <nav>
            <header>
                <img width="40" alt="Analog Logo" src="/images/logo.svg" />
                <span>SolidStart</span>
            </header>

            <section>
                <a href="/">Dashboard</a>
                <a href="/accounts">Accounts</a>
                <a href="/sales">Sales</a>
                <a href="/expenses">Expenses</a>
                <a href="/reports">Reports</a>
            </section>
        </nav>

        <main>
            { children }
        </main>
    </div>
}