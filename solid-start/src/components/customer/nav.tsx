import { JSX } from 'solid-js';
import Cart from './shop/cart';
import styles from './nav.module.css'
import Menu from '../auth/menu';
import logo from '~/images/logo.svg';

export default function Nav(props: JSX.HTMLAttributes<HTMLElement>) {
    return <nav {...props} class={`${styles.host} ${props.class}`}>
        <div>
            <header>
                <img width="40" alt="SolidStart Logo" src={logo} />
                <span>SolidStart</span>
            </header>

            <main>{props.children}</main>

            <aside>
                <Cart class={styles.cart} />
                <Menu />
            </aside>
        </div>
    </nav>
}