import { useParams } from '@solidjs/router';

export default function Invoice() {
    const params = useParams();

    return <p>invoice {params.invoiceId}</p>;
}