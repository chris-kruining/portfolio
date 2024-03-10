import { Dictionary } from '~/feature/i18n';
import type { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'ar-EG',
    direction: 'rtl',
    writingMode: 'horizontal-tb',
    items: {
        initial: 'الترجمة الأولية',
        another: 'ترجمة أخرى',
        search: {
            submit: 'يبحث',
            placeholder: 'بحث عن ___',
        },
        price: ({ number }, value: number, currency: Currency) => number(value, { style: 'currency', currency }),
        mood: {
            prompt: 'ما هو مزاجك؟',
            statement: ({ t }, mood: 'angry' | 'unhappy' | 'ok' | 'happy' | 'inLove') => `أنا ${t(`mood.${mood}`)}`,
            angry: 'غاضب',
            unhappy: 'تعيس',
            ok: 'نعم',
            happy: 'سعيد',
            inLove: 'يعشق',
        },
        planning: {
            board: {
                add: 'يضيف',
            },
        },
    },
} as const;

export default dictionary;
