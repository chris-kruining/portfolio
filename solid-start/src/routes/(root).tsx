import { ParentProps } from 'solid-js';
import { AuthProvider } from '~/feature/auth';


export default function Root(props: ParentProps) {
    return <>
        <AuthProvider>
            {props.children}
        </AuthProvider>
    </>
}