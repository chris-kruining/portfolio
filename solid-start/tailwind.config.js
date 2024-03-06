// import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', 'src/**/*.{js,ts,jsx,tsx}'],
    // mode: 'jit',
    darkMode: 'media',
    // experimental: 'all',
    theme: {
        extend: {},
    },
    plugins: [
        // plugin(({ addUtilities }) => {
        //     addUtilities({
        //         '.anchor-end': {
        //             positionFallback: '--fallback',
        //             '@position-fallback --fallback': {
        //                 '@try': {
        //                     'inset-block-start': 'anchor(end)',
        //                     'inset-inline-end': 'anchor(end)',
        //                 },
        //             },
        //         },
        //     });
        // }),
    ],
};
