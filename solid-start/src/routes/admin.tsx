import { A, RouteSectionProps } from '@solidjs/router';
import { For } from 'solid-js';
import { Menu, withAuthGuard } from '~/feature/auth';
import logo from '~/images/logo.svg';

export default function Admin(props: RouteSectionProps) {
    const menuItems = [
        ['/accounts', 'Accounts'],
        ['/planning', 'Planning'],
        ['/sales', 'Sales'],
        ['/expenses', 'Expenses'],
        ['/reports', 'Reports'],
    ];

    return withAuthGuard(() => (
        <div
            class="
            grid grid-cols-[12.5em_1fr] grid-rows-[100%] w-full h-full pt-6 bg-neutral-100
            after:row-start-1 after:row-span-1 after:col-start-2 after:col-span-1 after:content-[''] after:block after:w-full after:start-0 after:[inset-block-start: 0] after:bg-neutral-50 after:rounded-tl-2xl
        "
        >
            <nav class="row-start-1 row-span-1 col-start-1 col-span-1 grid grid-cols-[100%] grid-rows-[auto_1fr_auto] gap-4 p-4">
                <header class="grid grid-cols-[auto_1fr] grid-rows-[100%] items-center gap-2">
                    <A href="/dashboard" end class="contents">
                        <img class="w-10 aspect-square" width="40" alt="Analog Logo" src={logo} />
                        <span class="font-bold text-2xl text-neutral-700">SolidStart</span>
                    </A>
                </header>

                <section class="grid grid-flow-row content-start gap-2">
                    <For each={menuItems}>
                        {([url, text]) => (
                            <A
                                class="p-2 no-underline text-neutral-700 rounded-lg [.active]:font-bold [.active]:text-neutral-300 [.active]:bg-neutral-300"
                                href={url}
                            >
                                {text}
                            </A>
                        )}
                    </For>
                </section>

                <footer class="grid grid-flow-col justify-start items-center gap-2">
                    <Menu />
                    <a href="/">Back to front</a>
                </footer>
            </nav>

            <main class="row-start-1 row-span-1 col-start-2 col-span-1 grid grid-flow-row w-[calc(100% - 2em)] overflow-y-auto px-8 pb-[50em] mt-4 bg-neutral-50">
                {props.children}
            </main>
        </div>
    ));
}
