import { defineConfig } from "@solidjs/start/config";
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    start: {
        ssr: true,
        // islands: true,
    },
    plugins: [ mkcert() ],
});
