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

type ContentProps = { 
    isLoggedIn: boolean,
};

function Content() {
    const { user, login, logout } = useAuth();

    if(user() !== undefined) {
        return <>
            <A href="/sales">Sales</A>

            <ActionButton action={logout}>logout</ActionButton>
        </>
    }

    return <>
        <ActionButton action={login}>login</ActionButton>
    </>
}