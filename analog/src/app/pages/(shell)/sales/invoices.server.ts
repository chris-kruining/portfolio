import { PageServerLoad } from "@analogjs/router";
import { list } from "../../../../core/service/invoice.service";
import SuperJSON from 'superjson';

export const load = async ({ }: PageServerLoad) => {
    return {
        invoices: await list(),
    };
    // return SuperJSON.stringify({
    //     invoices: await list(),
    // });
}
