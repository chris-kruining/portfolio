import { JSX, createSignal } from 'solid-js';
import Rating from '~/components/form/rating';
import { useI18n } from '~/i18n.context';
import {
    FaSolidFaceSmileBeam,
    FaSolidFaceSmile,
    FaSolidFaceGrinHearts,
    FaSolidFaceAngry,
    FaSolidFaceFrown,
} from 'solid-icons/fa';

export default function Index() {
    const { t } = useI18n();
    const [flipFlop, next] = createSignal(false);

    setInterval(() => {
        next((last) => !last);
    }, 1000);

    const key = () => (flipFlop() ? 'initial' : 'another');

    return (
        <section class="col-start-[main] col-end-[main] grid gap-10">
            <span>Key is signal: {t(key())}</span>

            <span>numerical formatting: {t('price', 10)}</span>

            <Happiness />
        </section>
    );
}

const options = ['angry', 'unhappy', 'ok', 'happy', 'inLove'] as const;
type HappinessOption = (typeof options)[number];

const items: Record<HappinessOption, JSX.Element> = {
    angry: <FaSolidFaceAngry />,
    unhappy: <FaSolidFaceFrown />,
    ok: <FaSolidFaceSmile />,
    happy: <FaSolidFaceSmileBeam />,
    inLove: <FaSolidFaceGrinHearts />,
} as const;

function Happiness() {
    const [happiness, setHappiness] = createSignal<HappinessOption>('ok');
    const { t } = useI18n();

    return (
        <>
            <Rating
                name="Rating"
                label={t('mood.prompt')}
                options={options}
                value={happiness()}
                onChange={(v) => setHappiness(v)}
            >
                {(option) => items[option]}
            </Rating>

            <span>{t('mood.statement', happiness())}</span>
        </>
    );
}
