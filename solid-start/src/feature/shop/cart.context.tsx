import { Action, action, useSubmission } from '@solidjs/router';
import { Accessor, Component, ComponentProps, JSX, ParentProps, ValidComponent, createContext, createMemo, createSignal, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Product } from '~/services/products';
import { CartItem, createCart } from './cart.service';
import { CONTENT_TYPE } from './types';

type DraggableProps<T extends ValidComponent, P = ComponentProps<T>> = {
    [K in keyof P]: P[K];
} & {
    product: Product<any>;
};

type DropzoneProps<T extends ValidComponent, P = ComponentProps<T>> = {
    [K in keyof P]: P[K];
};

const CartContext = createContext<{
    items: Accessor<CartItem[]>,
    state: Accessor<'adding' | 'clearing' | 'idle' | 'dragging' | 'dropped'>,
    add: Action<[number, FormData], void>,
    clear: Action<[], void>,
    createDropzone: <T extends ValidComponent>(tag?: T) => Component<DropzoneProps<T>>,
    createDraggable: <T extends ValidComponent>(tag?: T) => Component<DraggableProps<T>>,
}>();

export const CartProvider = (props: ParentProps) => {
    const { items, ...cart } = createCart();
    const [dragging, setDragging] = createSignal<Product<any> | undefined>(undefined);
    const [dropped, setDropped] = createSignal<Product<any> | undefined>(undefined);

    function createDropzone<T extends ValidComponent>(component?: T) {
        return (props: DropzoneProps<T>) => {
            const activeClass = () => dragging() !== undefined ? 'active' : '';

            const onDragOver = (e: DragEvent) => {
                if (e.dataTransfer === null || e.dataTransfer.types.includes(CONTENT_TYPE.product) === false) {
                    return;
                }

                e.preventDefault();

                e.dataTransfer.effectAllowed = 'all';
            };

            const onDrop = (e: DragEvent) => {
                if (e.dataTransfer?.types.includes(CONTENT_TYPE.product) !== true) {
                    return;
                }

                const product = dragging();

                if (product === undefined) {
                    return;
                }

                setDropped(product);

                setDragging(undefined);
                setDropped(undefined);
                cart.add(product.id, 1, {});
            };

            return <Dynamic
                component={component ?? ('div' as any)}
                {...props}
                class={`${props.class ?? ''} dropzone ${activeClass()}`}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {props.children}
            </Dynamic>;
        }
    };

    function createDraggable<T extends ValidComponent>(component?: T) {
        return (props: DraggableProps<T>) => {
            const onDragStart = (event: DragEvent) => {
                if (event.dataTransfer === null) {
                    return;
                }

                event.dataTransfer.dropEffect = 'move';
                event.dataTransfer.setData('text/plain', props.product.title);
                event.dataTransfer.setData(CONTENT_TYPE.product, '');

                setDragging(props.product);
            };
            const onDragEnd = (event: DragEvent) => {
                setDragging(undefined);
            };

            return <Dynamic
                component={component ?? ('div' as any)}
                {...props}
                class={`${props.class ?? ''} isDraggable`}

                draggable="true"
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                {props.children}
            </Dynamic>;
        }
    };

    const add = action(async (id: number, data: FormData) => {
        const quantity = Number(data.get('quantity'));
        const variation = Object.fromEntries(Array.from(data.keys()).filter(k => k.startsWith('p_')).map(p => [p.slice(2), data.get(p)]));

        console.log(variation);

        await cart.add(id, quantity, variation);

        await new Promise(res => setTimeout(res, 1000));
    }, 'add');

    const clear = action(async () => {
        await cart.clear();

        await new Promise(res => setTimeout(res, 1000));
    }, 'clear');

    const addSubmission = useSubmission(add);
    const clearSubmission = useSubmission(clear);

    const state = createMemo(() => {
        if (dropped() !== undefined) {
            return 'dropped';
        }

        if (dragging() !== undefined) {
            return 'dragging';
        }

        if (addSubmission.pending === true) {
            return 'adding'
        }

        if (clearSubmission.pending === true) {
            return 'clearing'
        }

        return 'idle';
    });

    return <CartContext.Provider value={{ items, state, add, clear, createDraggable, createDropzone }}>
        {props.children}
    </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error('unable to load CartContext');
    }

    return context;
};