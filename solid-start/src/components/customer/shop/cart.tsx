import { For, JSX, Show, createEffect, createMemo } from "solid-js";
import styles from './cart.module.css';
import { useCart } from '~/contexts/shop/cart';
import ActionButton from '~/components/form/action-button';
import Price from './price';

type CartProps = JSX.AnchorHTMLAttributes<HTMLDivElement>;

export default function Cart(props: CartProps) {
    const { items, current, state, clear } = useCart();

    let popover!: HTMLDivElement;
    const isPending = () => state() !== 'idle';
    
    createEffect(() => {
        if(state() === 'adding') {
            popover.showPopover();
        }
    });

    const optimisticItems = createMemo(() => {
        return state() === 'clearing' ? [] : items;
    });

    const Fallback = () => <Show when={isPending() === false}>
        No items added yet
    </Show>

    return <div {...props}>
        <button popoverTarget={styles.cart} popoverTargetAction="show" id={styles.btn}>Cart {optimisticItems().length}</button>

        <div ref={popover} id={styles.cart} popover anchor={styles.btn}>
            <button popoverTarget={styles.cart} popoverTargetAction="hide">Cart {optimisticItems().length}</button>

            <Show when={optimisticItems().length > 0} fallback={<Fallback />} keyed>
                <For each={optimisticItems()}>
                    {item => <div>
                        <img src={item.product.image} />
                        
                        <strong>{item.product.name}</strong>
                        <span>{item.quantity}</span>

                        <strong><Price value={item.product.price} /></strong>

                        <Show when={Object.keys(item.variation).length > 0}>
                            <ul>
                                <For each={Object.entries(item.variation)}>
                                    {([ prop, value ]) => <li><b>{prop}:</b> {value}</li>}
                                </For>
                            </ul>
                        </Show>
                    </div>}
                </For>
            </Show>

            <Show when={current()}>
                {current => <div>
                    <p>Adding: </p>
                    <span>{current().product.name}</span>
                    <span>{current().quantity}</span>
                </div>}
            </Show>

            <Show when={isPending() || optimisticItems().length > 0}>
                <ActionButton action={clear} disabled={isPending()}>
                    <Show when={state() !== 'clearing'} fallback="Clearing items">
                        Clear items
                    </Show>
                </ActionButton>
            </Show>
        </div>
    </div>
}