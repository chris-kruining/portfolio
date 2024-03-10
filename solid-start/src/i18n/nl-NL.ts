import { Dictionary } from '~/feature/i18n';
import type { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'nl-NL',
    direction: 'ltr',
    writingMode: 'horizontal-tb',
    items: {
        initial: 'Initiële vertaling',
        another: 'Een andere vertaling',
        search: {
            submit: 'Zoeken',
            placeholder: 'Zoek voor ___',
        },
        price: ({ number }, value: number, currency: Currency) => number(value, { style: 'currency', currency }),
        mood: {
            prompt: 'Wat is je stemming?',
            statement: ({ t }, mood: 'angry' | 'unhappy' | 'ok' | 'happy' | 'inLove') => `Ik ben ${t(`mood.${mood}`)}`,
            angry: 'boos',
            unhappy: 'ontevreden',
            ok: 'oke',
            happy: 'blij',
            inLove: 'verliefd',
        },
        planning: {
            board: {
                add: 'Toevoegen',
            },
        },
    },
} as const;

export default dictionary;
