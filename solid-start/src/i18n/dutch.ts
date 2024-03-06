import { Dictionary } from "~/feature/i18n";

const dictionary = {
    locale: 'nl-NL',
    items: {
        initial: 'Initiële vertaling',
        another: 'Een andere vertaling',
    }
} as const;

export default dictionary satisfies Dictionary<(typeof dictionary)['items']>;