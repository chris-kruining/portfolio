import { Branch, Translation as T, createI18nContext } from './feature/i18n';

export type Definition = Branch<{
    initial: string;
    another: string;
    price: (value: number) => string;
    search: {
        submit: string;
        placeholder: string;
    };
}>;

const [Provider, use] = createI18nContext<Definition>();

export const I18nProvider = Provider;
export const useI18n = use;
