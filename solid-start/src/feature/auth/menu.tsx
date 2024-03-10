import { Accessor, Show } from 'solid-js';
import { User, useAuth } from '~/feature/auth/auth.context';
import ActionButton from '../../components/form/action-button';
import { As, DropdownMenu } from '@kobalte/core';

export function Menu() {
    const { user, login, logout } = useAuth();

    const WhenLoggedIn = ({ user }: { user: Accessor<User> }) => (
        <DropdownMenu.Root placement="bottom-end">
            <DropdownMenu.Trigger class="w-8 aspect-square">
                <img src={user().image} alt="avatar" />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content class="p-4 gap-4 z-10 grid">
                    <DropdownMenu.Item asChild>
                        <As component="a" href="/dashboard">
                            Admin
                        </As>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item asChild>
                        <As component="a" href="/sales/invoices">
                            Invoices
                        </As>
                    </DropdownMenu.Item>

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
