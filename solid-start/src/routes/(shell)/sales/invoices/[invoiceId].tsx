import { useParams } from '@solidjs/router';
import styles from './[invoiceId].module.css';

export default function Invoice() {
    const params = useParams();

    return <div class={styles.host}>
        Invoice {params.invoiceId}
    </div>;
}