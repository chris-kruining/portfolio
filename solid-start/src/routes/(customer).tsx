import { A, RouteSectionProps } from "@solidjs/router";
import styles from './(customer).module.css';
import Nav from "~/components/customer/nav";
import { CartProvider } from '~/contexts/shop/cart';

export default function Customer(props: RouteSectionProps) {
    return <div class={styles.host}>
        <CartProvider>
            <Nav class={styles.full}>
                <A href="/shop">shop</A>
                <A href="/brand">brands</A>
            </Nav>

            <main>{props.children}</main>
        </CartProvider>
    </div>
}