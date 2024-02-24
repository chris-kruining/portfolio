import { A } from "@solidjs/router";
import { For, JSX, Show, createEffect } from "solid-js";
import ActionButton from '~/components/form/action-button';
import { useCart, Price } from './';
import styles from './cart.module.css';
import type { Price as P } from '~/services/products';

type CartProps = JSX.AnchorHTMLAttributes<HTMLDivElement>;

export function Cart(props: CartProps) {
    const { items, state, clear, createDropzone } = useCart();

    let popover!: HTMLDivElement;

    const isPending = () => state() !== 'idle';
    const itemsInCart = () => items().reduce((t, i) => t + i.quantity, 0);
    const totals = () => Object.entries(Object.groupBy(items(), i => i.product.price.currency))
        .map(([currency, items]) => ({ currency, value: items.reduce((t, i) => t + (i.product.price.value * i.quantity), 0) })) as P[];

    createEffect(() => {
        if (['adding', 'dragging'].includes(state())) {
            popover.showPopover();
        }
    });

    const Dropzone = createDropzone();

    const Fallback = () => <Show when={isPending() === false}>
        No items added yet
    </Show>

    return <div {...props}>
        <button type="button" popoverTarget={styles.cart} popoverTargetAction="toggle" id={styles.btn}>Cart {itemsInCart()}</button>

        <Dropzone ref={popover} id={styles.cart} popover="auto" anchor={styles.btn}>
            <Show when={items().length > 0} fallback={<Fallback />} keyed>
                <main>
                    <For each={items()}>
                        {item => <div>
                            <img src={item.product.thumbnail} />

                            <strong>{item.product.title}</strong>
                            <span>{item.quantity}</span>

                            <strong><Price value={item.product.price} /></strong>

                            <Show when={Object.keys(item.variation).length > 0}>
                                <ul>
                                    <For each={Object.entries(item.variation)}>
                                        {([prop, value]) => <li><b>{prop}:</b> {value}</li>}
                                    </For>
                                </ul>
                            </Show>
                        </div>}
                    </For>
                </main>
                <div>
                    <For each={totals()}>
                        {total => <Price value={total} />}
                    </For>
                </div>
            </Show>

            <Show when={isPending() || items().length > 0}>
                <ActionButton action={clear} disabled={isPending()}>
                    <Show when={state() !== 'clearing'} fallback="Clearing items">
                        Clear items
                    </Show>
                </ActionButton>
            </Show>

            <A href="/checkout">To checkout</A>
        </Dropzone>
    </div>
}