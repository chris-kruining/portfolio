import { defineConfig } from "@solidjs/start/config";
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    start: {
        ssr: true,
        // islands: true,
        server: {
            baseURL: process.env.BASE_PATH,
            preset: "static",
            prerender: {
                routes: [ '/', '/sales'],
            },
        },
    },
    plugins: [ mkcert() ],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss'
    }
});
