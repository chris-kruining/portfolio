import { A } from '@solidjs/router';
import { For, Show, createEffect, createSignal } from 'solid-js';
import ActionButton from '~/components/form/action-button';
import type { Price as P } from '~/services/products';
import { useCart } from './';
import { DropdownMenu } from '@kobalte/core';
import { useI18n } from '~/i18n.context';

export function Cart() {
    const { t } = useI18n();
    const { items, state, clear, createDropzone } = useCart();
    const [open, setOpen] = createSignal(false);

    const isPending = () => state() !== 'idle';
    const itemsInCart = () => items().reduce((t, i) => t + i.quantity, 0);
    const totals = () =>
        Object.entries(Object.groupBy(items(), (i) => i.product.price.currency)).map(([currency, items]) => ({
            currency,
            value: items.reduce((t, i) => t + i.product.price.value * i.quantity, 0),
        })) as P[];

    createEffect((last) => {
        const current = state();

        if (['adding', 'dragging'].includes(current)) {
            setOpen(true);
        } else if (current === 'idle' && last === 'dragging') {
            setOpen(false);
        }

        return current;
    });

    const Dropzone = createDropzone(DropdownMenu.Content);

    const Fallback = () => <Show when={isPending() === false}>No items added yet</Show>;

    return (
        <DropdownMenu.Root open={open()} onOpenChange={setOpen} placement="bottom-end">
            <DropdownMenu.Trigger class="py-2 px-4">Cart {itemsInCart()}</DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <Dropzone class="grid p-4 gap-6 bg-neutral-50 border border-transparent rounded shadow [.active]:border-blue-500">
                    <Show when={items().length > 0} fallback={<Fallback />} keyed>
                        <section class="grid grid-cols-[3em_auto_auto] gap-6 py-4">
                            <For each={items()}>
                                {(item) => (
                                    <div class="col-span-3 grid grid-cols-subgrid gap-x-2 gap-y-4">
                                        <img class="row-span-2 w-full aspect-square" src={item.product.thumbnail} />

                                        <strong class="min-w-20">{item.product.title}</strong>
                                        <span>{item.quantity}</span>

                                        <strong class="min-w-20">
                                            {t('price', item.product.price.value, item.product.price.currency)}
                                        </strong>

                                        <Show when={Object.keys(item.variation).length > 0}>
                                            <ul class="col-span-2">
                                                <For each={Object.entries(item.variation)}>
                                                    {([prop, value]) => (
                                                        <li>
                                                            <b>{prop}:</b> {value}
                                                        </li>
                                                    )}
                                                </For>
                                            </ul>
                                        </Show>
                                    </div>
                                )}
                            </For>
                        </section>

                        <footer>
                            <For each={totals()}>{(total) => t('price', total.value, total.currency)}</For>
                        </footer>
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
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
