import { Accessor, For, JSX, createMemo, createUniqueId } from 'solid-js';

export type Option = string | number | string[] | undefined;

export type RatingProps<T> = {
    name: string;
    label?: string;
    value?: T;
    options: readonly T[];
    children: (item: T, index: Accessor<number>) => JSX.Element;
    onChange?: (value: T) => void;
};

export default function Rating<T extends Option>(props: RatingProps<T>) {
    const id = createUniqueId();

    const value = createMemo(() => {
        return props.value ? props.options.indexOf(props.value) : 0;
    });

    const length = createMemo(() => {
        return props.options?.length;
    });

    return (
        <div class="grid">
            <label for={id}>{props.label ?? ''}</label>

            <input
                class="w-[200px] px-2"
                type="range"
                id={id}
                name={props.name}
                list="values"
                step="1"
                min="0"
                max={length() - 1}
                value={value()}
                onChange={(event) => {
                    props.onChange?.(props.options.at(Number(event.target.value))!);
                }}
            />

            <datalist id="values">
                <For each={props.options}>{(option, index) => <option value={index()} />}</For>
            </datalist>

            <div class="flex flex-col justify-between [writing-mode:vertical-lr] w-[200px] px-2 mt-1">
                <For each={props.options}>{props.children}</For>
            </div>
        </div>
    );
}
