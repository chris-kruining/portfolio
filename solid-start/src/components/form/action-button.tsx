import { Action } from '@solidjs/router';
import { ParentProps } from 'solid-js';

export type ActionButtonProps = ParentProps & {
    action: Action<[FormData], any>;
    disabled?: boolean;
};

export default function ActionButton(props: ActionButtonProps) {
    return (
        <form action={props.action} method="post" class="contents">
            <button type="submit" disabled={props.disabled}>
                {props.children}
            </button>
        </form>
    );
}
