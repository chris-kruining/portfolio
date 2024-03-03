import { For, ParentProps, Show } from 'solid-js';
import { Column as ColumnComponent } from './column';
import { Card as CardComponent } from './card';
import { action, cache, createAsync, useSubmission } from '@solidjs/router';
import { boards, cards, columns as columnService } from './';
import type { Board } from './board.service';
import type { Column } from './column.service';
import type { Card } from './card.service';
import { host } from './board.module.css';
import { PlanningProvider } from './planning.context';

const getBoard = cache(async (id: number) => {
    'use server';

    const [board, columns] = await Promise.all([boards.get(id), columnService.getByBoardId(id)]);

    if (board === undefined) {
        return undefined;
    }

    return {
        ...board,
        columns,
        cards: (await Promise.all(columns.map((c) => cards.getByColumnId(c.id)))).flatMap((cards) => cards),
    };
}, 'getBoard');

const createColumnAction = action(async (boardId: number, data: FormData) => {
    'use server';

    const title = String(data.get('title'));

    return await columnService.create({ boardId, title });
}, 'createColumn');

const createCardAction = action(async (columnId: number, data: FormData) => {
    'use server';

    const title = String(data.get('title'));

    await cards.create({
        columnId,
        title,
    });
}, 'createCard');

export type BoardProps = { id: Board['id'] } & ParentProps;

export function Board(props: BoardProps) {
    const board = createAsync(async () => getBoard(props.id));

    const createColumnSubmission = useSubmission(createColumnAction);
    const optimisticColumn = () => {
        if (createColumnSubmission.pending === false || createColumnSubmission.input === undefined) {
            return undefined;
        }

        const [boardId, data] = createColumnSubmission.input;
        const title = String(data.get('title'));

        return {
            id: -1,
            boardId,
            title,
        } satisfies Column;
    };

    const createCardSubmission = useSubmission(createCardAction);
    const optimisticCard = () => {
        if (createCardSubmission.pending === false || createCardSubmission.input === undefined) {
            return undefined;
        }

        const [columnId, data] = createCardSubmission.input;
        const title = String(data.get('title'));

        return {
            id: -1,
            columnId,
            title,
        } satisfies Card;
    };

    const columns = () => {
        const columns = [...(board()?.columns ?? [])];
        const optimistic = optimisticColumn();

        if (optimistic !== undefined) {
            columns.push(optimistic);
        }

        return columns;
    };

    const cards = () => {
        const cards = [...(board()?.cards ?? [])];
        const optimistic = optimisticCard();

        if (optimistic !== undefined) {
            cards.push(optimistic);
        }

        return cards;
    };

    return (
        <PlanningProvider intent="intent">
            <Show when={board()}>
                {(board) => (
                    <div class={host}>
                        <h1>{board().title}</h1>

                        <main>
                            <For each={columns()}>
                                {(column) => (
                                    <ColumnComponent column={column}>
                                        <Show when={cards().filter((c) => c.columnId === column.id)}>
                                            {(cards) => (
                                                <>
                                                    <For each={cards()}>{(card) => <CardComponent card={card} />}</For>

                                                    <form action={createCardAction.with(column.id)} method="post">
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            required
                                                            placeholder={
                                                                cards().length > 0
                                                                    ? 'anything else?'
                                                                    : 'What to do, what to do'
                                                            }
                                                        />

                                                        <button type="submit">+</button>
                                                    </form>
                                                </>
                                            )}
                                        </Show>
                                    </ColumnComponent>
                                )}
                            </For>
                        </main>

                        <form action={createColumnAction.with(board().id)} method="post">
                            <label>
                                <span>New column</span>
                                <input type="text" name="title" required />
                            </label>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                )}
            </Show>
        </PlanningProvider>
    );
}
