import { A, RouteSectionProps  } from '@solidjs/router';
import styles from './(admin).module.css';
import logo from '~/../public/images/logo.svg';

export default function Admin(props: RouteSectionProps) {
    return <div class={styles.host}>
        <nav>
            <header>
                <img width="40" alt="Analog Logo" src={logo} />
                <span>SolidStart</span>
            </header>

            <section>
                <A href="/" end>Dashboard</A>
                <A href="/shop">shop</A>
                <A href="/accounts">Accounts</A>
                <A href="/sales">Sales</A>
                <A href="/expenses">Expenses</A>
                <A href="/reports">Reports</A>
            </section>
        </nav>

        <main>
            {props.children}
        </main>
    </div>
}