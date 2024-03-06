import type { Branch, Context } from "./types";

export const createDefaultProvider = <Definition extends Branch>() => ({
    translate: (key: string, context: Context<Definition>) => {
        const entry = context.dictionary.items[key];

        if(typeof entry === 'string') {
            return entry;
        }
        else if (typeof entry === 'function') {
            return entry();
        }
    
        return `"${key}" ${context.locale}`;
    }
});