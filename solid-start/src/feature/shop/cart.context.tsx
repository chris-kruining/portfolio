import { Action, action, useSubmission } from '@solidjs/router';
import { Accessor, Component, JSX, ParentProps, ValidComponent, createContext, createMemo, useContext } from 'solid-js';
import { Product } from '~/services/products';
import { CartItem, createCart } from './cart.service';
import { INTENT } from './types';
import { DropzoneProps, DraggableProps, createDragDropContext } from '../drag-drop/drap-drop.context';

const [DragDropProvider, useDragDropContext, createValue] = createDragDropContext<Product<any>>();

const CartContext = createContext<{
    items: Accessor<CartItem[]>;
    state: Accessor<'adding' | 'clearing' | 'idle' | 'dragging' | 'dropped'>;
    add: Action<[number, FormData], void>;
    clear: Action<[], void>;
    createDropzone: <T extends ValidComponent>(tag?: T) => Component<DropzoneProps<Product<any>, T>>;
    createDraggable: <T extends ValidComponent>(tag?: T) => Component<DraggableProps<Product<any>, T>>;
}>();

export const CartProvider = (props: ParentProps) => {
    const { items, ...cart } = createCart();
    const { dragging, dropped, createDraggable, createDropzone: baseCreateDropzone } = createValue(INTENT.addToCard);

    function createDropzone<Component extends ValidComponent>(component?: Component) {
        return baseCreateDropzone(component, {
            onDropped: (product: Product<any>) => {
                console.log(product);

                cart.add(product.id, 1, product.variations[0] ?? {});
            },
        });
    }

    const add = action(async (id: number, data: FormData) => {
        const quantity = Number(data.get('quantity'));
        const variation = Object.fromEntries(
            Array.from(data.keys())
                .filter((k) => k.startsWith('p_'))
                .map((p) => [p.slice(2), data.get(p)]),
        );

        await cart.add(id, quantity, variation);

        await new Promise((res) => setTimeout(res, 1000));
    }, 'add');

    const clear = action(async () => {
        await cart.clear();

        await new Promise((res) => setTimeout(res, 1000));
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
            return 'adding';
        }

        if (clearSubmission.pending === true) {
            return 'clearing';
        }

        return 'idle';
    });

    return (
        <DragDropProvider intent={INTENT.addToCard}>
            <CartContext.Provider value={{ items, state, add, clear, createDraggable, createDropzone }}>
                {props.children}
            </CartContext.Provider>
        </DragDropProvider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error('unable to load CartContext');
    }

    return context;
};
