import { action, useNavigate, useSubmission } from "@solidjs/router"
import { create } from "~/services/invoices";
import styles from './new.module.css';
import { Match, Show, Switch, createEffect, onMount } from "solid-js";

const createInvoice = action(async (data: FormData) => {
    return await create(data);
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

    return <div id="dialog" class={styles.dialog} ref={dialog} popover="auto" open>
        <Show when={submission.result instanceof Error}>
            <p>Encountered an error: {submission.result.message}</p>
        </Show>

        <form action={createInvoice} method="post">
            <input name="someInput" type="text" value="Some value" />

            <button type="submit">
                <Switch>
                    <Match when={submission.pending}>working on it</Match>
                    
                    <Match when={submission.result instanceof Error}>retry?</Match>

                    <Match when={submission.result}>Done!</Match>

                    <Match when={true}>Lets go!</Match>
                </Switch>
            </button>
        </form>
            
        <button popovertarget="dialog" popoverTargetAction="hide">cancel</button>
    </div>
}