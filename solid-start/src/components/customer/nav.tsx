import { A } from '@solidjs/router';
import { ParentProps } from 'solid-js';

import { Menu } from '~/feature/auth';
import { Cart } from '~/feature/shop';

import { Search } from '~/feature/search';
import logo from '~/images/logo.svg';
import { Picker } from '../picker';

export function Nav(props: ParentProps) {
    return (
        <nav
            class="
            grid grid-layout col-[full] sticky top-0 grid-cols-subgrid l-0 z-10 isolate bg-neutral-100 mt-20
            [animation-name:nav-host-scroll] [animation-timeline:--page-scroll] [animation-range-end:9em] [animation-fill-mode:both]
        "
        >
            <div class="grid grid-rows-[100%] grid-cols-[10em_1fr_auto] gap-4 py-4">
                <header class="grid grid-flow-col place-items-center justify-start gap-2">
                    <A class="contents" href="/">
                        <img width="40" alt="SolidStart Logo" src={logo} />
                        <span class="font-bold text-xl">SolidStart</span>
                    </A>
                </header>

                <main class="grid grid-flow-col justify-start content-center gap-4">{props.children}</main>

                <aside class="grid grid-flow-col gap-4">
                    <Picker />
                    <Search />
                    <Cart />
                    <Menu />
                </aside>
            </div>
        </nav>
    );
}
