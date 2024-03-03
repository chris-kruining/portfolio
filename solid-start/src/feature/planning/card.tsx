import { ParentProps } from 'solid-js';
import type { Card } from './card.service';
import { usePlanningContext } from './planning.context';

export type CardProps = { card: Card } & ParentProps;

export function Card(props: CardProps) {
    const { createDraggable } = usePlanningContext();

    const Draggable = createDraggable();

    return (
        <Draggable value={props.card}>
            <strong>{props.card.title}</strong>
        </Draggable>
    );
}
