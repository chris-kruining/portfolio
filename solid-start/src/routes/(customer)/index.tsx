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
import { Picker } from '~/components/picker';

export default function Index() {
    const { t } = useI18n();
    const [flipFlop, next] = createSignal(false);

    setInterval(() => {
        next((last) => !last);
    }, 2000);

    const key = () => (flipFlop() ? 'initial' : 'another');

    return (
        <section class="col-start-[main] col-end-[main] grid gap-10">
            <Picker />

            <span>{t(key())}</span>

            <span>{t('price', 10)}</span>

            <Happiness />
        </section>
    );
}

const options = ['angry', 'unhappy', 'ok', 'happy', 'in love'] as const;
type HappinessOption = (typeof options)[number];

const items: Record<HappinessOption, JSX.Element> = {
    angry: <FaSolidFaceAngry />,
    unhappy: <FaSolidFaceFrown />,
    ok: <FaSolidFaceSmile />,
    happy: <FaSolidFaceSmileBeam />,
    'in love': <FaSolidFaceGrinHearts />,
} as const;

function Happiness() {
    const [happiness, setHappiness] = createSignal<HappinessOption>('ok');

    return (
        <>
            <Rating
                name="Rating"
                label="What is your mood?"
                options={options}
                value={happiness()}
                onChange={(v) => setHappiness(v)}
            >
                {(option) => items[option]}
            </Rating>

            <span>I am {happiness()}</span>
        </>
    );
}
