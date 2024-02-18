import { Action, action, useSubmission } from '@solidjs/router';
import { Accessor, ParentProps, createContext, createEffect, createMemo, createSignal, onMount, useContext } from 'solid-js';
import { SetStoreFunction, Store, createStore } from 'solid-js/store';
import { Product, get } from '~/services/products';
import { equals } from '~/utilities/object';

type CartItem<P extends Product<any> = Product<any>> = {
    product: P,
    quantity: number,
    variation: P['variations'][number]
}

const CartContext = createContext<{ 
    items: CartItem[], 
    current: Accessor<CartItem|undefined>, 
    state: Accessor<'adding'|'clearing'|'idle'>, 
    add: Action<[FormData], void>, 
    clear: Action<[FormData], void>
}>();

export const CartProvider = (props: ParentProps) => {
    const [ items, setItems ] = createLocalStore<CartItem[]>([], 1);
    const [ item, setItem ] = createSignal<CartItem|undefined>(undefined);

    const add = action(async (data: FormData) => {
        const id = Number(data.get('id'));
        const quantity = Number(data.get('quantity'));
    
        const product = await get(id);
    
        if(product === undefined)
        {
            throw new Error('Product not found');
        }
    
        const variation = Object.fromEntries(product.properties.map(p => [ p.name, data.get(`p_${p.name}`) ]));
        const newItem = { product, quantity, variation };

        setItem(newItem);

        await new Promise(res => setTimeout(res, 1000));

        const existing = items.find(i => i.product.id === newItem.product.id && equals(i.variation, newItem.variation));

        if(existing) {
            const index = items.indexOf(existing);

            setItems(index, 'quantity', existing.quantity + newItem.quantity);
        }
        else {
            setItems(items.length, newItem);
        }
    }, 'add');
    
    const clear = action(async () => {
        await new Promise(res => setTimeout(res, 1000));

        setItems([]);
    }, 'clear');

    const addSubmission = useSubmission(add);
    const clearSubmission = useSubmission(clear);

    const state = createMemo(() => {
        if(addSubmission.pending === true) {
            return 'adding'
        }

        if(clearSubmission.pending === true) {
            return 'clearing'
        }

        return 'idle';
    });

    const current = createMemo(() => {
        switch(state()) {
            case 'adding': return item();

            case 'clearing': return undefined;

            case 'idle': return undefined;
        }
    });
    
    return <CartContext.Provider value={{ items, current, state, add, clear }}>
        {props.children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext)!;

function createLocalStore<T extends object>(initState: T, version: number): [Store<T>, SetStoreFunction<T>] {
    const [state, setState] = createStore(initState);
    const name = `cart.v${version}`;

    onMount(() => {
        console.log(localStorage[name]);

        if (localStorage[name]) {
            try {
                setState(JSON.parse(localStorage[name]));
            } 
            catch (error) {
                setState(() => initState);
            }
        }
    
        createEffect(() => {
            localStorage[name] = JSON.stringify(state);
        });
    })
    
    return [state, setState];
}