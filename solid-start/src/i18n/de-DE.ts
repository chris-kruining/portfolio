import { Dictionary } from '~/feature/i18n';
import type { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'de-DE',
    direction: 'ltr',
    writingMode: 'horizontal-tb',
    items: {
        initial: 'Erstübersetzung',
        another: 'Eine weitere Übersetzung',
        search: {
            submit: 'Suchen',
            placeholder: 'Suchen nach ___',
        },
        price: ({ number }, value: number, currency: Currency) =>
            `Preis: ${number(value, { style: 'currency', currency })}`,
        mood: {
            prompt: 'Wie ist deine Stimmung?',
            statement: ({ t }, mood: 'angry' | 'unhappy' | 'ok' | 'happy' | 'inLove') => `Ik ben ${t(`mood.${mood}`)}`,
            angry: 'wütend',
            unhappy: 'unzufrieden',
            ok: 'OK',
            happy: 'Glücklich',
            inLove: 'verliebt',
        },
    },
} as const;

export default dictionary;
