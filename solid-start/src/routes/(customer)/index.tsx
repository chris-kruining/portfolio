import { createSignal } from 'solid-js';
import Rating from '~/components/form/rating';
import { useI18n } from '~/feature/i18n';

export default function Index() {
    const { t } = useI18n();
    const [flipFlop, next] = createSignal(false);

    setInterval(() => {
        next((last) => !last);
    }, 2000);

    const key = () => (flipFlop() ? 'inital key' : 'another key!');

    return (
        <section class="col-start-[main] col-end-[main] grid gap-4">
            home page
            <span>{t(key())}</span>
            <Rating name="Rating" />
        </section>
    );
}
