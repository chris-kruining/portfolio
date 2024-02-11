/// <reference types="vitest" />

import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import nitro from '@analogjs/vite-plugin-nitro';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig(() => ({
    server: {
        proxy: {}, // Workaround for an issue with vite and https
    },
    plugins: [
        angular({
            
        }),
        nitro(),
        mkcert(),
    ],
}));
// export default defineConfig(({ mode }) => ({
//   server: {
//     proxy: {}, // Workaround for an issue with vite and https
//   },
//   optimizeDeps: {
//     include: ['@angular/common', '@angular/forms'],
//   },
//   ssr: {
//     noExternal: [],
//   },
//   publicDir: 'src/assets',
//   build: {
//     target: ['esnext'],
//   },
//   esbuild: {
//     tsconfigRaw: {
//       compilerOptions: {
//         target: 'esnext',
//         experimentalDecorators: true,
//       },
//     },
//   },
//   resolve: {
//     mainFields: ['module'],
//   },
//   plugins: [
//     angular(),
//     mkcert(),
//   ],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: ['src/test.ts'],
//     include: ['**/*.spec.ts'],
//   },
//   define: {
//     'import.meta.vitest': mode !== 'production',
//   },
// }));
