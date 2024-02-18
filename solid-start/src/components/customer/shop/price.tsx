import type { Price } from '~/services/products';

export type PriceProps = {
    value: Price,
};

export default function Price(props: PriceProps) {
    const symbol = {
        'EUR': '€',
        'USD': '$',
        'JPY': '¥',
    }[props.value.currency];

    return <>
        {symbol} {props.value.value}
    </>
}