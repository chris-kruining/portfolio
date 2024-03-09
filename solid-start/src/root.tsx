import { ParentProps, Suspense, createSignal } from 'solid-js';
import { Definition, I18nProvider } from './i18n.context';
import { AuthProvider } from './feature/auth';
import { createDefaultProvider, Dictionary } from './feature/i18n';
import english from '~/i18n/en-GB';
import dutch from '~/i18n/nl-NL';
import german from '~/i18n/de-DE';
import arabic from '~/i18n/ar-EG';
import japanese from '~/i18n/jp-JP';

export default function Root(props: ParentProps) {
    const dictionaries: Dictionary<Definition>[] = [english, dutch, german, arabic, japanese] as const;
    const [index, next] = createSignal(0);

    // setTimeout(
    //     () =>
    //         setInterval(() => {
    //             next((index) => (index + 1) % dictionaries.length);
    //         }, 2000),
    //     500,
    // );

    const locale = () => dictionaries[index()].locale;

    return (
        <>
            <Suspense>
                <I18nProvider locale={locale()} dictionaries={dictionaries} provider={createDefaultProvider}>
                    <AuthProvider>{props.children}</AuthProvider>
                </I18nProvider>
            </Suspense>
        </>
    );
}
