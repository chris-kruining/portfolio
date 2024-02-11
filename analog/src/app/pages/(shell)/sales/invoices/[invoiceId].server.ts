import { PageServerLoad } from "@analogjs/router";
import { z } from "zod";
import { get, invoice as schema } from "../../../../../core/service/invoice.service";
import { serialize } from "../../../../../core/utility/binary";

const invoiceParams = z.object({
    invoiceId: z.coerce.number().int().nonnegative(),
});

export const load = async ({ params }: PageServerLoad) => {
    const { invoiceId } = await invoiceParams.parseAsync(params);
    const invoice = (await get(invoiceId))!;

    const result = await serialize(z.object({ invoice: schema }), { invoice });

    Object.defineProperty(result, 'toJSON', {
        value: () => 'WOOP WOOP KAAS',
    })

    return new TextDecoder().decode(result);
}