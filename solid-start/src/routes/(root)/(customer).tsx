import { A, RouteSectionProps } from "@solidjs/router";
import { host } from './(customer).module.css';
import { Nav } from "~/components/customer/nav";
import { CartProvider } from '~/feature/shop';

export default function Customer(props: RouteSectionProps) {
    return <CartProvider>
        <div class={host}>
            <Nav>
                <A href="/shop">shop</A>
                <A href="/brand">brands</A>
            </Nav>

            {props.children}
        </div>
    </CartProvider>
}