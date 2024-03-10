import type { Price } from '~/services/products';
import { useI18n } from '~/i18n.context';

export type PriceProps = {
    value: Price;
};

export function Price(props: PriceProps) {
    const { t } = useI18n();

    return t('price', props.value.value, props.value.currency);
}
