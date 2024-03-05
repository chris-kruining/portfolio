import { For, Show, createEffect, onMount } from 'solid-js';
import { useSearch } from './search.context';
import { form, host } from './search.module.css';
import { useI18n } from '../i18n';

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
            <form class={form} action={searchAction} method="post" role="search">
                <input type="search" name="query" placeholder="Search for ..." value="bl" />
                <button type="submit">{t('Go!')}</button>
            </form>

            <search class={host} popover="auto" ref={resultsContainer}>
                <form action={searchAction} method="post" role="search">
                    <input type="search" name="query" placeholder="Search for ..." value="bl" />
                    <button type="submit">Go!</button>
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
