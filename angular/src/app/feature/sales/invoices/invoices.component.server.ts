import { inject } from "@angular/core";
import InvoiceService from "./service";
import { firstValueFrom } from "rxjs";
import { Invoice } from ".";

export const load = async (): Promise<readonly Invoice[]> => {
    const service = inject(InvoiceService);
    const invoices = await firstValueFrom(service.list());

    return invoices;
}