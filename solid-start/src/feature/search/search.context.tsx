import { Action, action, cache, createAsync } from "@solidjs/router";
import { Accessor, ParentProps, createContext, createSignal, useContext } from "solid-js";
import { query } from './search.service';

type SearchContext = {
    results: Accessor<SearchResultEntry[]>,
    searchAction: Action<[data: FormData], void>
};

type SearchResultEntry = {
    url: string,
    label: string,
};

const Context = createContext<SearchContext>();

const search = cache(query, 'search');

export function SearchProvider(props: ParentProps) {
    const [query, setQuery] = createSignal('');

    const results = createAsync(() => search(query()), { initialValue: [] });

    const searchAction = action(async (data: FormData) => {
        setQuery(String(data.get('query') ?? ''));
    }, 'search');

    return <Context.Provider value={{ results, searchAction }}>
        {props.children}
    </Context.Provider>
}

export const useSearch = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('Unable to provide search context. this likely means that it contains a bug');
    }

    return context;
}