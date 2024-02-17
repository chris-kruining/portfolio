import { createAsync, RouteLoadFuncArgs, cache, RouteSectionProps } from '@solidjs/router';
import styles from './[invoiceId].module.css';
import { ErrorBoundary, Show } from 'solid-js';
import { get } from '~/services/invoices';

const getInvoice = cache(get, 'invoice');

export const route = {
    load: ({ params }: RouteLoadFuncArgs) => createAsync(() => getInvoice(Number(params.invoiceId))),
};

export default function Invoice({ data }: RouteSectionProps<ReturnType<typeof route['load']>>) {    
    const invoice = data!;

    return <div class={styles.host}>
        <ErrorBoundary fallback={(err, reset) => <button onClick={reset}>Failed: {err.toString()}</button>}>
            <Show when={invoice()} fallback={<>Loading...</>}>
                <p>{ invoice()?.place }</p>
                
                <h1 class="price">{ invoice()?.price.value }</h1>
            
                <p>{ invoice()?.due.toLocaleDateString('en-GB') }</p>
            </Show>
        </ErrorBoundary>
    </div>
}