import type { Price } from '~/services/products';
import { Number } from '../i18n/number';

export type PriceProps = {
    value: Price;
};

export function Price(props: PriceProps) {
    return <Number value={props.value.value} />;
    // return `${symbol} ${props.value.value}`
}
