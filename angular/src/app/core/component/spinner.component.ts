import { Component } from "@angular/core";


@Component({
    standalone: true,
    selector: 'app-spinner',
    template: ``,
    styles: `
        @layer layout {
            :host {
                position: absolute;
                display: grid;
                place-items: center;
                inline-size: 100%;
                block-size: 100%;

                &::before, &::after {
                    content: '';
                    position: absolute;
                    display: block;
                    aspect-ratio: 1;

                    border-inline: .5em solid var(--grey-500);
                    border-block: .5em solid #0000;
                    border-radius: 50%;
                }

                &::before {
                    inline-size: 3em;
                    animation: rotate 1.5s infinite linear;
                }

                &::after {
                    inline-size: 5em;
                    animation: rotate 2s infinite reverse linear;
                }
            }
        }

        @layer spacing {
            
        }

        @layer theme {
            
        }

        @keyframes rotate {
            from {
                rotate: 0deg;
            }

            to {
                rotate: 360deg;
            }
        }
    `,
})
export default class Spinner {
}