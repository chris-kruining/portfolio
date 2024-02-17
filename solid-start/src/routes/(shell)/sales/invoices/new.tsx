import { action, redirect, useNavigate, useSubmission, useSubmissions } from "@solidjs/router"
import { create } from "~/services/invoices";
import styles from './new.module.css';
import { ErrorBoundary, For, Show, createEffect, onMount } from "solid-js";

const createInvoice = action(async (data: FormData) => {
    if(Math.floor(Math.random() * 5) === 3) {
        throw new Error('random error')
    }

    return await create(data);

    // if(data.get('action') === 'submit')
    // {
    //     await create(data);
    // }

    // return redirect('/sales/invoices');
}, 'createInvoice');

export default function NewInvoice() {
    const navigate = useNavigate();
    let dialog!: HTMLDialogElement;

    const submission = useSubmission(createInvoice);
    
    onMount(() => {
        dialog.addEventListener('toggle', (e) => {
            if((e as ToggleEvent).newState === 'closed') {
                navigate('/sales/invoices', { replace: true });
            }
        });

        dialog.showPopover();
    });

    createEffect(() => {
        if(submission.pending === false && submission.result !== undefined && !(submission.result instanceof Error)) {
            dialog.hidePopover();
        }
    });

    return <dialog id="dialog" class={styles.dialog} ref={dialog} popover="auto">
        <Show when={submission.result instanceof Error}>
            <p>Encountered an error: {submission.result.message}</p>
        </Show>

        <form action={createInvoice} method="post">
            <input name="someInput" type="text" value="Some value" />

            <button type="submit">
                <Show when={!submission.pending} fallback="working on it">
                    <Show when={submission.result} fallback="Lets go!">
                        <Show when={!(submission.result instanceof Error)} fallback="retry?">
                            Done!
                        </Show>
                    </Show>
                </Show>
            </button>
        </form>
            
        <button popovertarget="dialog" popoverTargetAction="hide">cancel</button>
    </dialog>
}