import { useAuth } from '~/contexts/auth';
import styles from './menu.module.css';
import { A } from '@solidjs/router';


export default function Menu() {
    const { user } = useAuth();

    return <>
        <button id={styles.btn} popoverTarget={styles.menu} popoverTargetAction="toggle"><img src={user.image} /></button>

        <div id={styles.menu} popover anchor={styles.btn}>
            <A href="/sales">Sales</A>
        </div>
    </>
}