import { Branch, createI18nContext } from './feature/i18n';

export type Definition = Branch<{
    initial: string;
    another: string;
    price: (value: number, currency: Currency) => string;
    search: {
        submit: string;
        placeholder: string;
    };
    mood: {
        prompt: string;
        statement: (mood: 'angry' | 'unhappy' | 'ok' | 'happy' | 'inLove') => string;
        angry: string;
        unhappy: string;
        ok: string;
        happy: string;
        inLove: string;
    };
    planning: {
        board: {
            add: string;
        };
    };
}>;

const [Provider, use] = createI18nContext<Definition>();

export const I18nProvider = Provider;
export const useI18n = use;
