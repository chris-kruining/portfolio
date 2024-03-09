import { Dictionary } from '~/feature/i18n';
import type { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'nl-NL',
    items: {
        initial: 'Initiële vertaling',
        another: 'Een andere vertaling',
        search: {
            submit: 'Zoeken',
            placeholder: 'Zoek voor ___',
        },
        price: ({ number }, value: number) => `Prijs ${number(value, { style: 'currency', currency: 'EUR' })}`,
    },
} as const;

export default dictionary;
