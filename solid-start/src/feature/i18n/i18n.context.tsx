import { Accessor, ParentProps, createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import { isServer } from 'solid-js/web';
import type { AnyBranch, Dictionary, Direction, Key, Locale, Provider } from './types';

export const createI18nContext = <Definition extends AnyBranch>() => {
    type ContextProps = {
        locale: Accessor<Locale>;
        supportedLocales: Accessor<Locale[]>;
        changeLocale: (nextLocale: Locale) => void;
        direction: Accessor<Direction>;
        t: (key: Key<Definition>, ...args: (string | number)[]) => string;
    };

    type ProviderProps = ParentProps & {
        locale: Locale;
        dictionaries: Dictionary<Definition>[];
        provider: (locale: Accessor<Locale>) => Provider<Definition>;
    };

    const Context = createContext<ContextProps>();

    function I18nProvider(props: ProviderProps) {
        const [locale, setLocale] = createSignal<Locale>(props.locale);
        const dictionary = createMemo(() => {
            const l = locale();
            const next = props.dictionaries.find((d) => d.locale === l);

            if (next === undefined) {
                throw new Error(`There is no dictionary found for locale '${l}'`);
            }

            return next;
        });
        const direction = createMemo(() => dictionary().direction);
        const writingMode = createMemo(() => dictionary().writingMode);

        const provider = props.provider(locale);

        const supportedLocales = createMemo(() => {
            return props.dictionaries.map((d) => d.locale);
        });

        createEffect(() => {
            setLocale(props.locale);
        });

        createEffect(() => {
            if (isServer) {
                return;
            }

            document.documentElement.setAttribute('lang', locale());
            document.documentElement.setAttribute('dir', direction());
            document.documentElement.style.setProperty('writing-mode', writingMode());
        });

        const t = (key: Key<Definition>, ...args: (string | number)[]) => {
            const l = locale();
            const d = dictionary();

            return provider.t(key, { locale: l, dictionary: d, args: args ?? [] });
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
