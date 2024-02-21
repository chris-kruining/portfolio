import { A } from '@solidjs/router';
import { JSX } from 'solid-js';
import logo from '~/images/logo.svg';
import Menu from '../auth/menu';
import styles from './nav.module.css'
import Cart from './shop/cart';

export default function Nav(props: JSX.HTMLAttributes<HTMLElement>) {
    return <nav {...props} class={`${styles.host} ${props.class}`}>
        <div>
            <header>
                <A href="/">
                    <img width="40" alt="SolidStart Logo" src={logo} />
                    <span>SolidStart</span>
                </A>
            </header>

            <main>{props.children}</main>

            <aside>
                <Cart class={styles.cart} />
                <Menu />
            </aside>
        </div>
    </nav>
}