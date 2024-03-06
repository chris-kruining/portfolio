import { useI18n } from '~/i18n.context';

type NumberProps = NumberFormatOptions & {
    key: string;
    value: number;
};

export function Number(props: NumberProps) {
    const { t } = useI18n();

    return <>{t(props.key, { value: props.value })}</>;
}
