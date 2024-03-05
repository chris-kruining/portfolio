import { For, ParentProps, Show } from 'solid-js';
import { Column as ColumnComponent } from './column';
import { Card as CardComponent } from './card';
import { action, cache, createAsync, useSubmission } from '@solidjs/router';
import { boards, cards, columns as columnService } from './';
import type { Board } from './board.service';
import type { Column } from './column.service';
import type { Card } from './card.service';
import { PlanningProvider } from './planning.context';
import { clsx } from 'clsx';
import { useI18n } from '../i18n';

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
    const { t } = useI18n();
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
                    <div class="grid grid-rows-[auto_1fr] grid-cols-[100%] gap-6">
                        <header class="sticky top-0 grid grid-flow-col justify-between z-1 gap-4 bg-slate-50">
                            <h1>{board().title}</h1>

                            <form
                                class="grid grid-flow-col items-center gap-2"
                                action={createColumnAction.with(board().id)}
                                method="post"
                            >
                                <input class="py-1 px-2" type="text" name="title" required placeholder="New column" />
                                <button type="submit">{t('Add')}</button>
                            </form>
                        </header>

                        <main class="grid grid-flow-col justify-start items-start overflow-hidden overflow-x-auto gap-8 py-4">
                            <For each={columns()}>
                                {(column) => (
                                    <ColumnComponent
                                        column={column}
                                        class="
                                            [&:not(:last-child)]:relative
                                            [&:not(:last-child)::after]:content-['']
                                            [&:not(:last-child)::after]:absolute
                                            [&:not(:last-child)::after]:top-0
                                            [&:not(:last-child)::after]:-end-4
                                            [&:not(:last-child)::after]:h-full
                                            [&:not(:last-child)::after]:border-e
                                            [&:not(:last-child)::after]:border-e-slate-200
                                            [&:not(:last-child)::after]:border-solid
                                        "
                                    >
                                        <Show when={cards().filter((c) => c.columnId === column.id)}>
                                            {(cards) => (
                                                <>
                                                    <For each={cards()}>
                                                        {(card) => <CardComponent card={card} class="col-span-2" />}
                                                    </For>

                                                    <form
                                                        class="col-span-2 grid grid-cols-subgrid border-solid border-b border-b-slate-500 placeholder:text-slate-300"
                                                        action={createCardAction.with(column.id)}
                                                        method="post"
                                                    >
                                                        <input
                                                            class="bg-transparent"
                                                            type="text"
                                                            name="title"
                                                            required
                                                            placeholder={
                                                                cards().length > 0
                                                                    ? 'anything else?'
                                                                    : 'What to do, what to do'
                                                            }
                                                        />

                                                        <button class="text-slate-500" type="submit">
                                                            +
                                                        </button>
                                                    </form>
                                                </>
                                            )}
                                        </Show>
                                    </ColumnComponent>
                                )}
                            </For>
                        </main>
                    </div>
                )}
            </Show>
        </PlanningProvider>
    );
}
