import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-invoice-index',
  template: `<img alt="Analog Logo" src="/analog.svg" />`,
  styles: [
    `
      :host > img {
        max-inline-size: 100%;
        object-size: contain;
      }
    `,
  ],
})
export default class HomeComponent {
  count = 0;

  increment() {
    this.count++;
  }
}

