import { defineConfig } from '@solidjs/start/config';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    start: {
        ssr: true,
        server: {
            // baseURL: process.env.BASE_PATH,
            preset: 'cloudflare-pages',
            prerender: {
                routes: ['/', '/sales'],
            },
        },
    },
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss',
    },
    plugins: [mkcert()],
});
