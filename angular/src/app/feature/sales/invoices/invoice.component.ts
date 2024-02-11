import { Component } from "@angular/core";
import { AsyncPipe, CommonModule } from '@angular/common';
import { resource } from '../../../../app/core/utilities/resource';
import { load } from "./invoice.component.server";

@Component({
    imports: [ CommonModule, AsyncPipe ],
    standalone: true,
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrl: './invoice.component.css',
})
export default class InvoiceComponent {    
    readonly invoice = resource<typeof load>();
}