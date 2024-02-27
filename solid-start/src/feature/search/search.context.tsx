import { Action, action } from "@solidjs/router";
import { ParentProps, createContext, useContext } from "solid-js";

type SearchContext = {
    searchAction: Action<[data: FormData], string[]>
};

const Context = createContext<SearchContext>();

const search = async (query: string) => {
    'use server';

    console.log({ query });

    return [
        { label: 'these' },
        { label: 'are' },
        { label: 'some' },
        { label: 'search' },
        { label: 'results' },
    ];
};

export function SearchProvider(props: ParentProps) {
    const searchAction = action(async (data: FormData) => {
        return await search(String(data.get('query') ?? ''));
    }, 'search')

    return <Context.Provider value={{ searchAction }}>
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