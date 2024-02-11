import { inject } from "@angular/core";
import InvoiceService from "./service";
import { firstValueFrom } from "rxjs";
import { Invoice } from ".";
import { PageServerLoad } from "src/routes.server";

export const load = async ({ params: { id } }: PageServerLoad): Promise<Invoice|undefined> => {
    const service = inject(InvoiceService);
    const invoice = await firstValueFrom(service.get(Number(id)));

    return invoice;
}