import type { Branch, Context, Dictionary, Entry, Key, Translation } from './types';

export const createDefaultProvider = <Definition extends Branch>() => ({
    translate: (key: Key<Definition>, context: Context<Definition>) => {
        const translation = access(key, context.dictionary);

        if (typeof translation === 'string') {
            return translation;
        } else if (typeof translation === 'function') {
            return translation(...context.args);
        }

        return `"${key}" ${context.locale}`;
    },
});

const access = <Definition extends Branch>(key: Key<Definition>, dictionary: Dictionary<Definition>): Translation => {
    const path = key.split('.');

    let entry = dictionary.items as Entry;

    for (const k of path) {
        if (entry === undefined || typeof entry !== 'object' || Object.hasOwn(entry, k) === false) {
            throw new Error(`unable to resolve key '${key}' for locale '${dictionary.locale}'`);
        }

        entry = (entry as Branch)[k];
    }

    return entry as Translation;
};
