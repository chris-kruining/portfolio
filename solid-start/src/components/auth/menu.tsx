import { useAuth } from '~/contexts/auth';
import styles from './menu.module.css';
import { A } from '@solidjs/router';
import ActionButton from '../form/action-button';

export default function Menu() {
    const { user, login, logout } = useAuth();

    return <>
        <button type="button" id={styles.btn} popoverTarget={styles.menu} popoverTargetAction="toggle">
            <img src={user?.image} alt="avatar" />
        </button>

        <div id={styles.menu} popover anchor={styles.btn}>
            <A href="/sales">Sales</A>

            <ActionButton action={user !== undefined ? logout : login}>{user !== undefined ? 'logout' : 'login'}</ActionButton>
        </div>
    </>
}