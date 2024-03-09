import { For, Show, createEffect } from 'solid-js';
import { useSearch } from './search.context';
import { useI18n } from '~/i18n.context';

export function Search() {
    const { t } = useI18n();
    const { results, searchAction } = useSearch();
    let resultsContainer!: HTMLDivElement;

    createEffect(() => {
        if (results().length > 0) {
            resultsContainer.showPopover();
        } else {
            resultsContainer.hidePopover();
        }
    });

    return (
        <>
            <form
                class="
                    grid grid-rows-1 grid-cols-[1fr_auto] border border-solid border-transparent rounded-lg
                    focus-within:border-neutral-700
                "
                action={searchAction}
                method="post"
                role="search"
            >
                <input
                    class="p-2 ps-4 bg-neutral-200 text-neutral-700 border-none rounded-l-lg"
                    type="search"
                    name="query"
                    placeholder={t('search.placeholder')}
                    value="bl"
                />
                <button class="p-2 bg-neutral-200 text-neutral-700 border-none rounded-r-lg" type="submit">
                    {t('search.submit')}
                </button>
            </form>

            <search
                class="
                    grid-cols-1 content-start p-4 gap-6 bg-neutral-50 border-2 border-neutral-100 rounded-lg shadow-lg
                    [&:popover-open]:grid
                    backdrop:bg-neutral-950 backdrop:bg-opacity-10 backdrop:backdrop-blur
                "
                popover="auto"
                ref={resultsContainer}
            >
                <form class="text-xl" action={searchAction} method="post" role="search">
                    <input
                        class="p-2 ps-4 bg-neutral-200 text-neutral-700 border-none rounded-l-lg"
                        type="search"
                        name="query"
                        placeholder={t('search.placeholder')}
                        value="bl"
                    />
                    <button class="p-2 bg-neutral-200 text-neutral-700 border-none rounded-r-lg" type="submit">
                        {t('search.submit')}
                    </button>
                </form>

                <main>
                    <Show when={results().length > 0}>
                        <span>{results().length} results</span>

                        <ul>
                            <For each={results()}>
                                {(result) => (
                                    <li>
                                        <a href={result.url}>{result.label}</a>
                                    </li>
                                )}
                            </For>
                        </ul>
                    </Show>
                </main>
            </search>
        </>
    );
}
