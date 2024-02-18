import { JSX, ParentProps } from 'solid-js';
import Cart from './shop/cart';
import styles from './nav.module.css'
import Menu from '../auth/menu';

export default function Nav(props: JSX.HTMLAttributes<HTMLElement>) {
    return <nav {...props} class={`${styles.host} ${props.class}`}>
        <div>
            <header>
                <img width="40" alt="Analog Logo" src="/images/logo.svg" />
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