import { defineConfig } from "@solidjs/start/config";
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    base: '/portfolio/',
    start: {
        ssr: true,
        // islands: true,
        server: {
            prerender: {
                routes: [ '/', '/sales'],
            },
        },
    },
    plugins: [ mkcert() ],
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            drafts: {
                nesting: true,
            }
        }
    },
    build: {
        cssMinify: 'lightningcss'
    }
});
