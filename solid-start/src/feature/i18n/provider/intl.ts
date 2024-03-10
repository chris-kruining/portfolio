import { Accessor, createMemo } from 'solid-js';
import { Key, Context, Locale, Dictionary, AnyBranch, AnyEntry, AnyTranslation } from '../types';

export const createProvider = <Definition extends AnyBranch>(locale: Accessor<Locale>) => {
    const formatter = (options?: NumberFormatOptions) => {
        return Intl.NumberFormat(locale(), options as any);
    };

    const number = (value: number, options?: NumberFormatOptions) => {
        return formatter(options).format(value);
    };

    const access = (key: Key<Definition>, dictionary: Dictionary<Definition>): AnyTranslation => {
        const path = key.split('.');

        let entry = dictionary.items as AnyEntry;

        for (const k of path) {
            if (entry === undefined || typeof entry !== 'object' || Object.hasOwn(entry, k) === false) {
                throw new Error(`unable to resolve key '${key}' for locale '${dictionary.locale}'`);
            }

            entry = (entry as AnyBranch)[k];
        }

        return entry as AnyTranslation;
    };

    const t = (key: Key<Definition>, context: Context<Definition>) => {
        const translation = access(key, context.dictionary);

        if (typeof translation === 'string') {
            return translation;
        } else if (typeof translation === 'function') {
            return translation({ number, t: (k: Key<Definition>) => t(k, context) }, ...context.args);
        }

        return `"${key}" ${context.locale}`;
    };

    return {
        number,
        t,
    };
};
