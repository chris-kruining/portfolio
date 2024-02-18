// @refresh reload
import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import './styles.css';
import { AuthProvider } from './contexts/auth';

export default function App() {
    return <>
        <AuthProvider>
            <Router root={props => <Suspense>{props.children}</Suspense>}>
                <FileRoutes />
            </Router>
        </AuthProvider>
    </>;
}
