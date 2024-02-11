import { Component, HostBinding, HostListener, Input, booleanAttribute, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterModule, RouterPreloader } from "@angular/router";
import { HoverPreloadStrategy, RegistryService } from "../strategy/hover-strategy";

@Component({
    imports: [ RouterModule ],
    providers: [ HoverPreloadStrategy ],
    standalone: true,
    selector: 'a[to]',
    template: `<ng-content></ng-content>`,
    styles: `
        @layer base {
            :host {
                text-decoration: none;
                color: var(--grey-500);

                &.active {
                    color: var(--grey-700);
                    background-color: var(--grey-200);
                    font-weight: bold;
                }
            }
        }
    `,
    hostDirectives: [
        {
            directive: RouterLink,
            inputs: [ 'routerLink: to' ],
        },
        RouterLinkActive,
    ],
})
export default class Navlink {
    private readonly routerPreLoader = inject(RouterPreloader);
    private readonly registry = inject(RegistryService);
    private readonly routerLinkActive = inject(RouterLinkActive);
    private readonly routerLink = inject(RouterLink);

    @Input() public to!: string;
    
    @Input({ transform: booleanAttribute }) public set exact(exact: boolean) {
        this.routerLinkActive.routerLinkActiveOptions = { ...this.routerLinkActive.routerLinkActiveOptions, exact };
    }

    @HostBinding('class.active') private get isActive(): boolean {
        return this.routerLinkActive.isActive;
    }

    @HostListener('pointerenter', ['$event'])
    onPointerEnter(event: PointerEvent) {
        this.registry.add(this.routerLink.urlTree!);
        this.routerPreLoader.preload().subscribe((...args) => console.log(...args));
    }
}

