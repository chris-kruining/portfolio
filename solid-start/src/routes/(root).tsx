import { ParentProps } from 'solid-js';
import { AuthProvider } from '~/contexts/auth';


export default function Root(props: ParentProps) {
    return <>
        <AuthProvider>
            {props.children}
        </AuthProvider>
    </>
}