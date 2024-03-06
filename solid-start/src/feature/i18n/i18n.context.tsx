import { Accessor, ParentProps, createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { isServer } from 'solid-js/web';
import type { Branch, Dictionary, Direction, Key, Locale, Provider } from './types';

type ContextProps = {
    locale: Accessor<Locale>;
    supportedLocales: Accessor<Locale[]>;
    changeLocale: (nextLocale: Locale) => void;
    direction: Accessor<Direction>;
    t: <Definition extends Branch>(key: Key<Definition>, args?: Record<string, any>) => string;
};

const Context = createContext<ContextProps>();

type ProviderProps<Definition extends Branch> = ParentProps & {
    locale: Locale;
    direction?: Direction;
    dictionaries: Dictionary<Definition>[];
    provider: Provider<Definition>;
};

export function I18nProvider<Definition extends Branch>(props: ProviderProps<Definition>) {
    const [locale, setLocale] = createSignal<Locale>(props.locale);
    const [direction, setDirection] = createSignal<Direction>(props.direction ?? 'ltr');

    const supportedLocales = createMemo(() => {
        return props.dictionaries.map((d) => d.locale);
    });

    createEffect(() => {
        setLocale(props.locale);
    });

    createEffect(() => {
        setDirection(props.direction ?? 'ltr');
    });

    createEffect(() => {
        if (isServer) {
            return;
        }

        document.documentElement.setAttribute('lang', locale());
        document.documentElement.setAttribute('dir', direction());
    });

    const t = (key: Key<Definition>, args?: Record<string, any>) => {
        const l = locale();
        const dictionary = props.dictionaries.find((d) => d.locale === l);

        if (dictionary === undefined) {
            throw new Error(`There is no dictionary found for locale '${l}'`);
        }

        return props.provider.translate(key, { locale: l, dictionary });
    };

    return (
        <Context.Provider value={{ locale, supportedLocales, changeLocale: setLocale, direction, t }}>
            {props.children}
        </Context.Provider>
    );
}

export const useI18n = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('Make sure you are inside an <I18nProvider>');
    }

    return context;
};
