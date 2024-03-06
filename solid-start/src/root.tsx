import { ParentProps, Suspense, createSignal } from 'solid-js';
import { AuthProvider } from './feature/auth';
import { createI18nContext, createDefaultProvider, Dictionary, Translation } from './feature/i18n';
import english from '~/i18n/english';
import dutch from '~/i18n/dutch';

type Definition = {
    initial: Translation;
    another: Translation;
};

const [I18nProvider, useI18n] = createI18nContext<Definition>();

export default function Root(props: ParentProps) {
    const [flipFlop, next] = createSignal(false);

    // setTimeout(
    //     () =>
    //         setInterval(() => {
    //             next((last) => !last);
    //         }, 2000),
    //     500,
    // );

    const locale = () => (flipFlop() ? 'en-GB' : 'nl-NL');
    const dictionaries: Dictionary<Definition>[] = [english, dutch];

    return (
        <>
            <Suspense>
                <I18nProvider locale={locale()} dictionaries={dictionaries} provider={createDefaultProvider()}>
                    <AuthProvider>{props.children}</AuthProvider>
                </I18nProvider>
            </Suspense>
        </>
    );
}
