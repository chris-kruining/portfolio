import { RouteSectionProps, createAsync } from "@solidjs/router";
import { For, onMount } from "solid-js";
import { list } from "~/services/products";
import { host, cell, highlight, tile } from './index.module.css';
import { Tile, useCart } from '~/feature/shop';

export const route = {
    load: () => createAsync(() => list()),
};

export default function Index(props: RouteSectionProps<ReturnType<typeof route['load']>>) {
    const products = props.data!;
    const { createDraggable } = useCart();
    const random = Math.floor(Math.random() * 5);

    const Cell = createDraggable('a');

    return <div class={host}>
        <aside>
            some filters to be added
        </aside>

        <main>
            <For each={products()}>
                {(product, index) =>
                    <Cell
                        product={product}
                        class={`${cell} ${index() === random ? highlight : ''}`}

                        href={`/shop/${product.id}`}
                    >
                        <Tile class={tile} product={product} />
                    </Cell>
                }
            </For>
        </main>

    </div>
}