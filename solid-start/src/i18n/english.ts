import { Dictionary } from "~/feature/i18n";

const dictionary = {
    locale: 'en-GB',
    items: {
        initial: 'Initial translation',
        another: 'Another translation',
        price: (value: number) => '',
    }
} as const;

export default dictionary satisfies Dictionary<(typeof dictionary)['items']>;