import { ParentProps, Suspense, createSignal } from 'solid-js';
import { Definition, I18nProvider } from './i18n.context';
import { AuthProvider } from './feature/auth';
import { Dictionary } from './feature/i18n';
import english from '~/i18n/english';
import dutch from '~/i18n/dutch';
import { createProvider } from './feature/i18n/provider/intl';

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
                <I18nProvider locale={locale()} dictionaries={dictionaries} provider={createProvider}>
                    <AuthProvider>{props.children}</AuthProvider>
                </I18nProvider>
            </Suspense>
        </>
    );
}
