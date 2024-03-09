import { Dictionary } from '~/feature/i18n';
import { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'en-GB',
    direction: 'ltr',
    writingMode: 'horizontal-tb',
    items: {
        initial: 'Initial translation',
        another: 'Another translation',
        search: {
            submit: 'Search',
            placeholder: 'Search for ___',
        },
        price: ({ number }, value: number) => `Price: ${number(value, { style: 'currency', currency: 'EUR' })}`,
        mood: {
            prompt: 'What is your mood',
            statement: ({ t }, mood: 'angry' | 'unhappy' | 'ok' | 'happy' | 'inLove') => `I am ${t(`mood.${mood}`)}`,
            angry: 'angry',
            unhappy: 'unhappy',
            ok: 'ok',
            happy: 'happy',
            inLove: 'in love',
        },
    },
} as const;

export default dictionary;
