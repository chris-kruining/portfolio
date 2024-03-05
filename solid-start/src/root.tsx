import { ParentProps, Suspense, createSignal } from 'solid-js';
import { AuthProvider } from './feature/auth';
import { I18nProvider, defaultProvider } from './feature/i18n';

export default function Root(props: ParentProps) {
    const [flipFlop, next] = createSignal(false);

    setTimeout(
        () =>
            setInterval(() => {
                next((last) => !last);
            }, 2000),
        500,
    );

    const locale = () => (flipFlop() ? 'en-GB' : 'nl-NL');

    return (
        <>
            <Suspense>
                <I18nProvider locale={locale()} provider={defaultProvider}>
                    <AuthProvider>{props.children}</AuthProvider>
                </I18nProvider>
            </Suspense>
        </>
    );
}
