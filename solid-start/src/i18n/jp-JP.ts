import { Dictionary } from '~/feature/i18n';
import type { Definition } from '~/i18n.context';

const dictionary: Dictionary<Definition> = {
    locale: 'jp-JP',
    direction: 'ltr',
    // writingMode: 'vertical-rl',
    writingMode: 'horizontal-tb',
    items: {
        initial: '初期翻訳',
        another: '別の翻訳',
        search: {
            submit: '検索',
            placeholder: '検索する ___',
        },
        price: ({ number }, value: number, currency: Currency) =>
            `価格: ${number(value, { style: 'currency', currency })}`,
        mood: {
            prompt: 'あなたの気分は何ですか',
            statement: ({ t }, mood: 'angry' | 'unhappy' | 'ok' | 'happy' | 'inLove') => `私は ${t(`mood.${mood}`)}`,
            angry: '怒り',
            unhappy: '不幸な',
            ok: 'わかりました',
            happy: 'ハッピー',
            inLove: '恋愛中',
        },
    },
} as const;

export default dictionary;
