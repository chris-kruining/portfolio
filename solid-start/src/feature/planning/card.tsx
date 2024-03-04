import { ParentProps } from 'solid-js';
import type { Card as CardModel } from './card.service';
import { usePlanningContext } from './planning.context';

export type CardProps = { class?: string | undefined; card: CardModel } & ParentProps;

export function Card(props: CardProps) {
    const { createDraggable } = usePlanningContext();

    const Draggable = createDraggable();

    return (
        <Draggable class={props.class ?? ''} value={props.card}>
            <strong class="text-xl font-bold underline">{props.card.title}</strong>
        </Draggable>
    );
}
