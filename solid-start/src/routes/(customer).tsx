import { A, RouteSectionProps } from '@solidjs/router';
import { Nav } from '~/components/customer/nav';
import { SearchProvider } from '~/feature/search';
import { CartProvider } from '~/feature/shop';

export default function Customer(props: RouteSectionProps) {
    return (
        <CartProvider>
            <SearchProvider>
                <div class="grid grid-layout content-start w-full h-full overflow-auto [scroll-timeline:--page-scroll_block] bg-neutral-100">
                    <Nav>
                        <A href="/shop">shop</A>
                        <A href="/brand">brands</A>
                    </Nav>

                    {props.children}
                </div>
            </SearchProvider>
        </CartProvider>
    );
}
