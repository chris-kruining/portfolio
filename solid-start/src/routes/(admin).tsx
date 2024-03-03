import { A, RouteSectionProps } from '@solidjs/router';
import { Menu, withAuthGuard } from '~/feature/auth';
import logo from '~/images/logo.svg';
import styles from './(admin).module.css';

export default function Admin(props: RouteSectionProps) {
    return withAuthGuard(() => (
        <div class={styles.host}>
            <nav>
                <header>
                    <A href="/dashboard" end>
                        <img width="40" alt="Analog Logo" src={logo} />
                        <span>SolidStart</span>
                    </A>
                </header>

                <section>
                    <A href="/accounts">Accounts</A>
                    <A href="/planning">Planning</A>
                    <A href="/sales">Sales</A>
                    <A href="/expenses">Expenses</A>
                    <A href="/reports">Reports</A>
                </section>

                <footer>
                    <Menu />
                    <a href="/">Back to front</a>
                </footer>
            </nav>

            <main>{props.children}</main>
        </div>
    ));
}
