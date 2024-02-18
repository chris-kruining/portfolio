import { RouteLoadFuncArgs, RouteSectionProps, createAsync } from "@solidjs/router"
import { For, Show } from "solid-js"
import { get } from "~/services/brands"
import { list } from "~/services/products"

export const route = {
    load: ({ params }: RouteLoadFuncArgs) => {
        const brand = get(Number(params.brandId));

        return {
            brand: createAsync(() => brand),
            products: createAsync(async () => {
                const b = await brand;
                const p = await list();
                
                return p.filter(p => p.brand.id == b?.id);
            }),
        }
    },
}
export default function Brand(props: RouteSectionProps<ReturnType<typeof route['load']>>) {
    const { brand, products } = props.data!;

    return <>
        <Show when={brand()}>
            {brand => <>
                <h1>{brand().name}</h1>

                <For each={products()}>
                    {product => <>
                        {product.name}
                    </>}
                </For>
            </>}
        </Show>
    </>
}