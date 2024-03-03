import { A, RouteSectionProps } from "@solidjs/router";
import { Nav } from "~/components/customer/nav";
import { SearchProvider } from "~/feature/search";
import { CartProvider } from '~/feature/shop';
import { host } from './(customer).module.css';

export default function Customer(props: RouteSectionProps) {
    return <CartProvider>
        <SearchProvider>
            <div class={host}>
                <Nav>
                    <A href="/shop">shop</A>
                    <A href="/brand">brands</A>
                </Nav>

                {props.children}
            </div>
        </SearchProvider>
    </CartProvider>
}