import { Accessor, Show } from 'solid-js';
import { User, useAuth } from '~/feature/auth/auth.context';
import ActionButton from '../../components/form/action-button';
import { menu, btn } from './menu.module.css';

export function Menu() {
    const { user, login, logout } = useAuth();

    const WhenLoggedIn = ({ user }: { user: Accessor<User> }) => <>
        <button type="button" id={btn} popoverTarget={menu} popoverTargetAction="toggle">
            <img src={user().image} alt="avatar" />
        </button>

        <div id={menu} popover anchor={btn}>
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