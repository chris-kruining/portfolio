import { Accessor, Show } from 'solid-js';
import { User, useAuth } from '~/feature/auth/auth.context';
import ActionButton from '../../components/form/action-button';
import { DropdownMenu } from '@kobalte/core';
import { A } from '@solidjs/router';

export function Menu() {
    const { user, login, logout } = useAuth();

    const WhenLoggedIn = ({ user }: { user: Accessor<User> }) => (
        <DropdownMenu.Root placement="bottom-end">
            <DropdownMenu.Trigger class="w-8 aspect-square">
                <img src={user().image} alt="avatar" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content class="p-4 gap-4 z-10 grid bg-neutral-50">
                    <A href="/admin/dashboard">Admin</A>
                    <A href="/admin/sales/invoices">Invoices</A>

                    <ActionButton action={logout}>logout</ActionButton>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );

    const WhenLoggedOut = () => (
        <>
            <ActionButton action={login}>login</ActionButton>
        </>
    );

    return (
        <Show when={user()} fallback={<WhenLoggedOut />}>
            {(user) => <WhenLoggedIn user={user} />}
        </Show>
    );
}
