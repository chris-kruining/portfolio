import { Routes } from "@angular/router";
import InvoicesComponent from "./invoices.component";
import InvoiceComponent from "./invoice.component";
import Empty from "src/app/core/component/empty.component";
import { load as loadInvoice } from "./invoice.component.server";
import { load as loadInvoices } from "./invoices.component.server";
import { resolver } from "src/app/core/utilities/resolver";

export default [
    { path: '', component: InvoicesComponent, resolve: { load: resolver(loadInvoices) }, children: [
        { path: '', component: Empty },
        { path: ':id', component: InvoiceComponent, resolve: { load: resolver(loadInvoice) } },
    ] },
] satisfies Routes;

