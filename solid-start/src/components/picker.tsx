import { Select } from '@kobalte/core';
import { useI18n } from '~/i18n.context';
import { createMemo } from 'solid-js';
import { FaSolidCheck, FaSolidCaretDown } from 'solid-icons/fa';
import { Locale } from '~/feature/i18n';

interface LocateOption {
    value: Locale;
    label: string;
}

const locales: LocateOption[] = [
    { value: 'en-GB', label: 'English' },
    { value: 'nl-NL', label: 'Nederlands' },
];

type PickerProps = {};

export function Picker(props: PickerProps) {
    const { locale, supportedLocales, changeLocale } = useI18n();

    const value = createMemo(() => {
        return locales.find((l) => l.value === locale());
    });

    const onChange = (next: LocateOption) => {
        changeLocale(next.value);
    };

    return (
        <>
            <Select.Root<LocateOption>
                options={locales}
                optionValue="value"
                optionTextValue="label"
                value={value()}
                onChange={onChange}
                itemComponent={(props) => (
                    <Select.Item item={props.item} class="grid grid-flow-col">
                        <Select.ItemIndicator>
                            <FaSolidCheck />
                        </Select.ItemIndicator>
                        <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
                    </Select.Item>
                )}
            >
                <Select.Trigger class="grid grid-flow-col" aria-label="Locale">
                    <Select.Value<LocateOption>>{(state) => state.selectedOption().label}</Select.Value>

                    <Select.Icon>
                        <FaSolidCaretDown />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content>
                        <Select.Listbox class="grid p-2 gap-2 bg-neutral-50" />
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </>
    );
}
