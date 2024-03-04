// @refresh reload
import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start';
import './styles.css';
import './index.css';
import Root from './root';

export default function App() {
    return (
        <>
            <Router root={Root}>
                <FileRoutes />
            </Router>
        </>
    );
}
