import { Translation as T, createI18nContext } from './feature/i18n';

export type Definition = {
    initial: T;
    another: T;
    price: T<(value: number) => string>;
    search: {
        submit: T;
        placeholder: T;
    };
};

const [Provider, use] = createI18nContext<Definition>();

export const I18nProvider = Provider;
export const useI18n = use;
