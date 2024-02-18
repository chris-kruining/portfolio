import { A, RouteLoadFuncArgs, RouteSectionProps, action, createAsync, useSubmission } from "@solidjs/router";
import { For, Show, createEffect, createMemo, useContext } from "solid-js";
import { get } from "~/services/products";
import styles from './[productId].module.css';
import { useCart } from '~/contexts/shop/cart';
import Price from '~/components/customer/shop/price';

export const route = {
    load: ({ params }: RouteLoadFuncArgs) => createAsync(() => get(Number(params.productId))),
};

export default function Details(props: RouteSectionProps<ReturnType<typeof route['load']>>) {
    const product = props.data!;
    const { state, add } = useCart();

    const variations = createMemo(() => Object.entries<Set<any>>(product()?.variations.reduce(
        (result, variation) => {
            for(const [ k, v ] of Object.entries(variation)) {    
                result[k].add(v);
            }

            return result;
        }, 
        Object.fromEntries(product()?.properties.map(p => [ p.name, new Set<any>() ]) ?? [])
    ) ?? []));

    const submission = useSubmission(add);

    return <div class={styles.host}>
        <Show when={product()} fallback={<NotFound />}>
            {product => <>
                <img src={product().image} />

                <form action={add} method="post">
                    <h1>{product().name}</h1>
                    <A href={`/brand/${product().brand.id}`} class={styles.brand}>{product().brand.name}</A>

                    <h2><Price value={product().price} /></h2>

                    <article>{product().description}</article>

                    <hr />

                    <For each={variations()}>
                        {([ property, values ]) => <section>
                            <strong>{property}</strong>

                            <ul>
                                <For each={Array.from(values.values())}>
                                    {(v, i) => <label><input type="radio" name={`p_${property}`} value={v} checked={i() === 0} />{v}</label>}
                                </For>
                            </ul>

                            <Show when={property === 'size'}>
                                <button class="link" popoverTarget="size-guide" popoverTargetAction="show" type="button">Size guide</button>
                            </Show>
                        </section>}
                    </For>

                    <label>
                        Quantity: 
                        <input type="number" name="quantity" min="1" max="100" value="1" />
                    </label>

                    <input type="hidden" name="id" value={product().id} />
                    <button type="submit" disabled={state() !== 'idle'}>Add to cart</button>
                </form>
            </>}
        </Show>

        <div id="size-guide" popover>
            <button popoverTargetAction="hide" popoverTarget="size-guide">X</button>

            <h3>Size guide: Macros</h3>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>XXS</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>XXL</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <th>Protain (grams)</th>
                        <td>10</td>
                        <td>15</td>
                        <td>20</td>
                        <td>25</td>
                        <td>30</td>
                        <td>35</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <th>Carbs (grams)</th>
                        <td>100</td>
                        <td>150</td>
                        <td>200</td>
                        <td>250</td>
                        <td>300</td>
                        <td>350</td>
                        <td>400</td>
                    </tr>
                </tbody>
            </table>

            <h3>How do macros affect you</h3>

            <p>carbs bad, protains good. that's it</p>
        </div>
    </div>
}

function NotFound() {
    return <>
        Product was not found :S
    </>
}