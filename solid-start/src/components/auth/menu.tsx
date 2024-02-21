import { Accessor, Show } from 'solid-js';
import { User, useAuth } from '~/contexts/auth';
import ActionButton from '../form/action-button';
import styles from './menu.module.css';

export default function Menu() {
    const { user, login, logout } = useAuth();

    const WhenLoggedIn = ({ user }: { user: Accessor<User> }) => <>
        <button type="button" id={styles.btn} popoverTarget={styles.menu} popoverTargetAction="toggle">
            <img src={user().image} alt="avatar" />
        </button>

        <div id={styles.menu} popover anchor={styles.btn}>
            <a href="/dashboard">Admin</a>
            <a href="/sales/invoices">Invoices</a>

            <ActionButton action={logout}>logout</ActionButton>
        </div>
    </>;

    const WhenLoggedOut = () => <>
        <ActionButton action={login}>login</ActionButton>
    </>;

    return <Show when={user()} fallback={<WhenLoggedOut />}>
        {user => <WhenLoggedIn user={user} />}
    </Show>
}

function Content() {
}