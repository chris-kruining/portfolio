import { ParentProps, Suspense } from 'solid-js';
import { AuthProvider } from './feature/auth';

export default function Root(props: ParentProps) {
    return (
        <>
            <Suspense>
                <AuthProvider>{props.children}</AuthProvider>
            </Suspense>
        </>
    );
}
