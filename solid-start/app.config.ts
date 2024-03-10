import { defineConfig } from '@solidjs/start/config';
import { config } from 'vinxi/plugins/config';
import tailwindcss from 'tailwindcss';
import tailwindNesting from 'tailwindcss/nesting/index.js';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    ssr: true,
    server: {
        // baseURL: process.env.BASE_PATH,
        // preset: 'cloudflare-pages',
        prerender: {
            routes: ['/', '/sales'],
        },
    },
    vite: {
        plugins: [
            config('tailwind', {
                css: {
                    postcss: {
                        plugins: [tailwindNesting, tailwindcss],
                    },
                },
            }),
            mkcert(),
        ],
    },
});
