import { Component, effect } from "@angular/core";
import { AsyncPipe, CommonModule } from '@angular/common';
import { load } from "./[invoiceId].server";
import { LoadResult } from "@analogjs/router";
import { resource } from "../../../../../core/utility/resource";
import { Invoice } from "src/core/service/invoice.service";

@Component({
    imports: [ CommonModule, AsyncPipe ],
    standalone: true,
    selector: 'app-invoice',
    templateUrl: './[invoiceId].page.html',
    styleUrl: './\[invoiceId\].page.css',
})
export default class InvoiceComponent {
    readonly invoice = resource(({ invoice }: { invoice: Invoice }) => invoice);

    constructor() {
        effect(() => {
            console.log(this.invoice());
        });
    }
}