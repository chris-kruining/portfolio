import { Translation as T, createI18nContext } from './feature/i18n';

export type Definition = {
    initial: T;
    another: T;
    price: T;
    search: {
        submit: (value: number) => string;
    };
};

const [Provider, use] = createI18nContext<Definition>();

export const I18nProvider = Provider;
export const useI18n = use;
