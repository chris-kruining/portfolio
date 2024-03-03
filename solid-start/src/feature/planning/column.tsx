import { ParentProps, createUniqueId } from 'solid-js';
import type { Column } from './column.service';
import { action, useAction } from '@solidjs/router';
import { host, popoverButton, popoverHost } from './column.module.css';
import { usePlanningContext } from './planning.context';
import { cards, columns } from './';
import type { Card } from './card.service';

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

export type ColumnProps = { column: Column } & ParentProps;

export function Column(props: ColumnProps) {
    const { createDropzone } = usePlanningContext();
    const id = createUniqueId();

    const update = useAction(updateCardAction);

    const Dropzone = createDropzone('main');

    return (
        <div class={host}>
            <h2>{props.column.title}</h2>

            <button
                type="button"
                id={`button-${id}`}
                class={popoverButton}
                popoverTarget={`popover-${id}`}
                popoverTargetAction="show"
            >
                ...
            </button>

            <div id={`popover-${id}`} class={popoverHost} anchor={`button-${id}`} popover="auto">
                <form action={updateColumnAction.with(props.column.id)} method="post">
                    <input type="text" name="title" value={props.column.title} required />
                    <button type="submit">Update</button>
                </form>

                <form action={removeAction.with(props.column.id)} method="post">
                    <button type="submit">Remove</button>
                </form>
            </div>

            <Dropzone
                isDropAllowed={(card) => card.columnId !== props.column.id}
                onDropped={(card) => {
                    update(card, props.column.id);
                }}
            >
                {props.children}
            </Dropzone>
        </div>
    );
}
