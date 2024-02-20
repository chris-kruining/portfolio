import { A, RouteSectionProps, useNavigate  } from '@solidjs/router';
import styles from './(admin).module.css';
import logo from '~/images/logo.svg';
import { useAuth } from '~/contexts/auth';
import { createEffect } from 'solid-js';
import Menu from '~/components/auth/menu';

export default function Admin(props: RouteSectionProps) {
    const navigate = useNavigate();
    const { user } = useAuth();

    createEffect(() => {
        if (user() === undefined) {
            navigate('/shop', { replace: true });
        }
    });

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

            <footer>
                <Menu />
            </footer>
        </nav>

        <main>
            {props.children}
        </main>
    </div>
}