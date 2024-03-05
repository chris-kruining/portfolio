import { Accessor, ParentProps, createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';

type Direction = 'ltr' | 'rtl';

type ContextProps = {
    locale: Accessor<string>;
    direction: Accessor<Direction>;
    t: (key: string) => string;
};

const Context = createContext<ContextProps>();

type ProviderProps = ParentProps & {
    locale: string;
    direction?: Direction;
    provider: {
        translate: (
            key: string,
            context: {
                language: string;
            },
        ) => string;
    };
};

export function I18nProvider(props: ProviderProps) {
    const [locale, setLocale] = createSignal(props.locale);
    const [direction, setDirection] = createSignal(props.direction ?? '');

    createEffect(() => {
        setLocale(props.locale);
    });

    const t = (key: string) => {
        return props.provider.translate(key, { language: locale() });
    };

    return <Context.Provider value={{ locale, direction, t }}>{props.children}</Context.Provider>;
}

export const useI18n = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('failed to return the i18n context. it likely contains a bug');
    }

    return context;
};
