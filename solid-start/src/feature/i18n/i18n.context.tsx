import { Accessor, ParentProps, createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { isServer } from 'solid-js/web';
import type { Branch, Dictionary, Direction, Key, Locale, Provider } from './types';

type ContextProps<Definition extends Branch> = {
    locale: Accessor<Locale>;
    supportedLocales: Accessor<Locale[]>;
    changeLocale: (nextLocale: Locale) => void;
    direction: Accessor<Direction>;
    t: (key: Key<Definition>, ...args: (string | number)[]) => string;
};

type ProviderProps<Definition extends Branch> = ParentProps & {
    locale: Locale;
    direction?: Direction;
    dictionaries: Dictionary<Definition>[];
    provider: (locale: Accessor<Locale>) => Provider<Definition>;
};

export const createI18nContext = <Definition extends Branch>() => {
    const Context = createContext<ContextProps<Definition>>();

    function I18nProvider<Definition extends Branch>(props: ProviderProps<Definition>) {
        const [locale, setLocale] = createSignal<Locale>(props.locale);
        const [direction, setDirection] = createSignal<Direction>(props.direction ?? 'ltr');
        const provider = props.provider(locale);

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

        const t = (key: Key<Definition>, ...args: (string | number)[]) => {
            const l = locale();
            const dictionary = props.dictionaries.find((d) => d.locale === l);

            if (dictionary === undefined) {
                throw new Error(`There is no dictionary found for locale '${l}'`);
            }

            return provider.translate(key, { locale: l, dictionary, args: args ?? [] });
        };

        return (
            <Context.Provider value={{ locale, supportedLocales, changeLocale: setLocale, direction, t }}>
                {props.children}
            </Context.Provider>
        );
    }

    const useI18n = () => {
        const context = useContext(Context);

        if (context === undefined) {
            throw new Error('Make sure you are inside an <I18nProvider>');
        }

        return context;
    };

    return [I18nProvider, useI18n] as const;
};
