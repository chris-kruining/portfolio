import { Action } from '@solidjs/router';
import styles from './action-button.module.css'
import { ParentProps } from 'solid-js';

export type ActionButtonProps = ParentProps & {
    action: Action<[FormData], any>,
    disabled?: boolean,
};

export default function ActionButton(props: ActionButtonProps) {
    return <form action={props.action} method="post" class={styles.host}>
        <button type="submit" disabled={props.disabled}>{props.children}</button>
    </form>
}