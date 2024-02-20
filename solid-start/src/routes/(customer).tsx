import { A, RouteSectionProps } from "@solidjs/router";
import styles from './(customer).module.css';
import Nav from "~/components/customer/nav";
import { CartProvider } from '~/contexts/shop/cart';
import { AuthProvider } from '~/contexts/auth';

export default function Customer(props: RouteSectionProps) {
    return <AuthProvider>
        <CartProvider><div class={styles.host}>
            <Nav class={styles.full}>
                <A href="/shop">shop</A>
                <A href="/brand">brands</A>
            </Nav>

            <main>{props.children}</main>
        </div>
        </CartProvider>
    </AuthProvider>
}