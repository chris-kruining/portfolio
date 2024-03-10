import { RouteDefinition, RouteSectionProps, createAsync } from '@solidjs/router';
import { For } from 'solid-js';
import { Product, list } from '~/services/products';
import { useCart } from '~/feature/shop';
import { useI18n } from '~/i18n.context';

export const route = {
    load: () => createAsync(() => list()),
} satisfies RouteDefinition;

export default function Index(props: RouteSectionProps<ReturnType<(typeof route)['load']>>) {
    const products = props.data!;
    const { t } = useI18n();
    const { createDraggable } = useCart();
    const random = Math.floor(Math.random() * 5);

    const Cell = createDraggable('a');

    return (
        <div class="col-[full] grid grid-cols-subgrid relative pt-8 bg-neutral-100 after:content-[''] after:-grid-col-2 after:w-full after:h-full after:bg-neutral-50">
            <aside class="col-start-[main] col-span-4">some filters to be added</aside>

            <main class="col-span-8 grid grid-cols-4 grid-flow-dense justify-evenly p-8 -m-s-8 gap-y-8 gap-x-4 bg-neutral-50 rounded-tl-[4rem]">
                <For each={products()}>
                    {(product, index) => {
                        const highlighted = index() === random;

                        return (
                            <Cell
                                class={`
                                    grid grid-cols-subgrid rounded transition-all @container
                                    hover:shadow hover:scale-105
                                    ${highlighted ? 'row-span-6 col-span-3' : 'row-span-3 grid-rows-subgrid'}
                                `}
                                value={product}
                                href={`/shop/${product.id}`}
                            >
                                <div
                                    class={`grid p-2 text-neutral-700 rounded @xs:grid-rows-subgrid @xs:grid-cols-subgrid ${
                                        highlighted ? 'relative grid-rows-[100%] grid-cols-[100%]' : ''
                                    }`}
                                >
                                    <img
                                        class={`rounded-sm aspect-square object-cover w-full ${
                                            highlighted ? 'absolute w-full h-full' : ''
                                        }`}
                                        src={product.thumbnail}
                                    />
                                    <span
                                        class={
                                            highlighted
                                                ? 'place-self-end p-4 bg-emerald-300 text-emerald-900 rounded z-10'
                                                : ''
                                        }
                                    >
                                        {product.title}
                                    </span>
                                    <span>{t('price', product.price.value, product.price.currency)}</span>
                                </div>
                            </Cell>
                        );
                    }}
                </For>
            </main>
        </div>
    );
}
