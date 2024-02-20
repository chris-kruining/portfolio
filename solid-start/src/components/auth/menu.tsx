import { useAuth } from '~/contexts/auth';
import styles from './menu.module.css';
import { A } from '@solidjs/router';
import ActionButton from '../form/action-button';
import { Show } from 'solid-js';

export default function Menu() {
    const { user } = useAuth();

    return <>
        <button type="button" id={styles.btn} popoverTarget={styles.menu} popoverTargetAction="toggle">
            <Show when={user()} fallback="Log in">
                {user => <img src={user().image} alt="avatar" />}
            </Show>
        </button>

        <div id={styles.menu} popover anchor={styles.btn}>
            <Content />
        </div>
    </>
}

function Content() {
    const { user, login, logout } = useAuth();

    const WhenLoggedIn = () => <>
        <A href="/sales">Sales</A>

        <ActionButton action={logout}>logout</ActionButton>
    </>;

    const WhenLoggedOut = () => <>
        <ActionButton action={login}>login</ActionButton>
    </>;

    return <Show when={user() !== undefined} fallback={<WhenLoggedOut />}>
        <WhenLoggedIn />
    </Show>
}