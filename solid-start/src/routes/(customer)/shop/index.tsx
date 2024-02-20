import { A, RouteSectionProps, createAsync } from "@solidjs/router";
import { For } from "solid-js";
import { list } from "~/services/products";


export const route = {
    load: () => createAsync(() => list()),
};

export default function Index(props: RouteSectionProps<ReturnType<typeof route['load']>>) {
    const products = props.data!;

    return <>
        <For each={products()}>
            {product => <A href={`/shop/${product.id}`}>
                <span>{product.name}</span>
                <img src={product.thumbnail} />
            </A>}
        </For>
    </>
}