import { Accessor, Setter, createEffect, createSignal, onMount } from 'solid-js';
import { Product, get } from '~/services/products';
import { equals } from '~/utilities/object';

export type CartItem<P extends Product<any> = Product<any>> = {
    product: P,
    quantity: number,
    variation: P['variations'][number]
}

export const createCart = () => {
    const [items, setItems] = createLocalStore<CartItem[]>([], 1);

    const add = async (id: number, quantity: number, variation: Record<string, any>) => {
        const product = await get(id);

        if (product === undefined) {
            throw new Error('Product not found');
        }

        const newItem = { product, quantity, variation };

        setItems(items => merge(items, newItem));

        await new Promise(res => setTimeout(res, 1000));
    };

    const clear = async () => {
        setItems(() => []);

        await new Promise(res => setTimeout(res, 1000));
    };

    return {
        items,
        add,
        clear,
    }
}

const merge = (items: CartItem[], toMerge: CartItem) => {
    const existing = items.find(i => i.product.id === toMerge.product.id && equals(i.variation, toMerge.variation));

    if (existing === undefined) {
        return [...items, toMerge];
    }

    return items.with(
        items.indexOf(existing), 
        { ...existing, quantity: existing.quantity + toMerge.quantity }
    );
}

function createLocalStore<T extends object>(initState: T, version: number): [Accessor<T>, Setter<T>] {
    const [state, setState] = createSignal(initState);
    const name = `cart.v${version}`;

    onMount(() => {
        if (localStorage[name]) {
            try {
                setState(() => JSON.parse(localStorage[name]));
            }
            catch (error) {
                setState(() => initState);
            }
        }

        createEffect(() => {
            localStorage[name] = JSON.stringify(state());
        });
    })

    return [state, setState];
}