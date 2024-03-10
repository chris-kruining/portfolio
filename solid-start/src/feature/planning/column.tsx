import { ParentProps } from 'solid-js';
import type { Column } from './column.service';
import { action, useAction } from '@solidjs/router';
import { usePlanningContext } from './planning.context';
import { cards, columns } from './';
import type { Card } from './card.service';
import { DropdownMenu } from '@kobalte/core';
import { FaSolidEllipsisVertical } from 'solid-icons/fa';
import ActionButton from '~/components/form/action-button';

const removeAction = action(async (id: number) => {
    'use server';

    console.log(`removing column ${id}`);

    await columns.remove(id);
}, 'removeColumn');

const updateColumnAction = action(async (columnId: number, data: FormData) => {
    const title = String(data.get('title'));

    console.log({ columnId, title });

    await columns.update(columnId, { title });
}, 'updateColumn');

const updateCardAction = action(async (card: Card, columnId: number) => {
    await cards.update(card.id, { ...card, columnId });
}, 'updateCard');

export type ColumnProps = { class?: string | undefined; column: Column } & ParentProps;

export function Column(props: ColumnProps) {
    const { createDropzone } = usePlanningContext();

    const update = useAction(updateCardAction);

    const Dropzone = createDropzone('main');

    return (
        <div
            class={`relative grid grid-cols-[1fr_auto] content-start items-center justify-items-start gap-4 rounded outline outline-offset-2 outline-transparent has-[main.active]:outline-pink-500 ${
                props.class ?? ''
            }`}
        >
            <h2>{props.column.title}</h2>

            <DropdownMenu.Root placement="bottom-end">
                <DropdownMenu.Trigger>
                    <FaSolidEllipsisVertical />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content class="grid bg-neutral-50 p-2 gap-2 shadow">
                        <form action={updateColumnAction.with(props.column.id)} method="post">
                            <input type="text" name="title" value={props.column.title} required />
                            <button type="submit">Update</button>
                        </form>

                        <ActionButton action={removeAction.with(props.column.id)}></ActionButton>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <Dropzone
                isDropAllowed={(card) => card.columnId !== props.column.id}
                onDropped={(card) => {
                    update(card, props.column.id);
                }}
                class="col-span-2 grid grid-cols-subgrid gap-4"
            >
                {props.children}
            </Dropzone>
        </div>
    );
}
