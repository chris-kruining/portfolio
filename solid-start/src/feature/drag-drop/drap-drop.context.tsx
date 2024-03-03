import {
    Accessor,
    Component,
    ComponentProps,
    ParentProps,
    ValidComponent,
    createContext,
    createSignal,
    useContext,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

export type DraggableProps<DataValue extends object, T extends ValidComponent, P = ComponentProps<T>> = {
    [K in keyof P]: P[K];
} & {
    value: DataValue;
};

export type DropzoneProps<DataValue extends object, T extends ValidComponent, P = ComponentProps<T>> = {
    [K in keyof P]: P[K];
} & {
    isDropAllowed?: (value: DataValue) => boolean;
    onDropped: (value: DataValue) => void;
};

export type DragDropContext<DataValue extends object> = {
    dragging: Accessor<DataValue | undefined>;
    dropped: Accessor<DataValue | undefined>;
    createDropzone: <T extends ValidComponent>(tag?: T) => Component<DropzoneProps<DataValue, T>>;
    createDraggable: <T extends ValidComponent>(tag?: T) => Component<DraggableProps<DataValue, T>>;
};

export const createDragDropContext = <DataValue extends object>() => {
    type DragDropProviderProps = {
        intent: string;
    } & ParentProps;

    const Context = createContext<DragDropContext<DataValue>>();

    const createValue = (intent: string) => {
        const [dragging, setDragging] = createSignal<DataValue | undefined>(undefined);
        const [dropped, setDropped] = createSignal<DataValue | undefined>(undefined);

        function createDropzone<Component extends ValidComponent>(
            component?: Component,
            defaults?: Partial<Pick<DropzoneProps<DataValue, Component>, 'isDropAllowed' | 'onDropped'>>,
        ) {
            return (props: DropzoneProps<DataValue, Component>) => {
                const [isActive, setIsActive] = createSignal(0);
                const [isAllowed, setIsAllowed] = createSignal(false);

                const onDragOver = (e: DragEvent) => {
                    const value = dragging();
                    const isDropAllowed = props.isDropAllowed ?? defaults?.isDropAllowed ?? (() => true);

                    if (
                        e.dataTransfer === null ||
                        e.dataTransfer.types.includes(intent.toLowerCase()) === false ||
                        value === undefined ||
                        isDropAllowed(value) !== true
                    ) {
                        setIsAllowed(false);

                        return;
                    }

                    setIsAllowed(true);

                    e.preventDefault();
                    e.dataTransfer.effectAllowed = 'all';
                };

                const onDragEnter = (e: DragEvent) => {
                    setIsActive((i) => i + 1);
                };

                const onDragLeave = (e: DragEvent) => {
                    setIsActive((i) => i - 1);
                };

                const onDrop = (e: DragEvent) => {
                    if (e.dataTransfer?.types.includes(intent.toLowerCase()) !== true) {
                        return;
                    }

                    const dataValue = dragging();

                    if (dataValue === undefined) {
                        return;
                    }

                    setIsActive(0);

                    setDropped(() => dataValue);

                    setDragging(undefined);
                    setDropped(undefined);

                    defaults?.onDropped?.(dataValue);
                    props?.onDropped?.(dataValue);
                };

                const activeClass = () => (isActive() === 1 && isAllowed() ? 'active' : '');

                return (
                    <Dynamic
                        component={component ?? ('div' as any)}
                        {...props}
                        class={`${props.class ?? ''} dropzone ${activeClass()}`}
                        onDragOver={onDragOver}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        {props.children}
                    </Dynamic>
                );
            };
        }

        function createDraggable<Component extends ValidComponent>(component?: Component) {
            return (props: DraggableProps<DataValue, Component>) => {
                const onDragStart = (event: DragEvent) => {
                    if (event.dataTransfer === null) {
                        return;
                    }

                    event.dataTransfer.dropEffect = 'move';
                    event.dataTransfer.setData(intent, 'intent');

                    setDragging(() => props.value);
                };
                const onDragEnd = (event: DragEvent) => {
                    setDragging(undefined);
                };

                return (
                    <Dynamic
                        component={component ?? ('div' as any)}
                        {...props}
                        class={`${props.class ?? ''} isDraggable`}
                        draggable="true"
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    >
                        {props.children}
                    </Dynamic>
                );
            };
        }

        return { dragging, dropped, createDropzone, createDraggable };
    };

    const DragDropProvider = (props: DragDropProviderProps) => {
        return <Context.Provider value={createValue(props.intent)}>{props.children}</Context.Provider>;
    };

    const useDragDropContext = () => {
        const context = useContext(Context);

        if (context === undefined) {
            throw new Error('unable to load CartContext');
        }

        return context;
    };

    return [DragDropProvider, useDragDropContext, createValue] as const;
};
