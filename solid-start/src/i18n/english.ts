import { Dictionary } from '~/feature/i18n';
import { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'en-GB',
    items: {
        initial: 'Initial translation',
        another: 'Another translation',
        search: {
            submit: 'Search',
            placeholder: 'Search for ___',
        },
        price: (value: number) => `Price: ${value}`,
    },
} as const;

export default dictionary;
