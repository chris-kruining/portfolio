// import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', 'src/**/*.{js,ts,jsx,tsx}'],
    // mode: 'jit',
    darkMode: 'media',
    // experimental: 'all',
    theme: {
        extend: {
            animation: {
                'nav-host-scroll': 'nav-host-scroll',
            },
            keyframes: {
                'nav-host-scroll': {
                    '0%': {
                        backgroundColor: 'pink',
                    },
                    '100%': {
                        backgroundColor: 'purple',
                    },
                },

                'nav-header-scroll': {
                    '0%': {
                        translate: '0 -5em',
                        scale: '1.25',
                    },
                    '75%': {
                        scale: '1',
                    },
                    '100%': {
                        translate: '0 0',
                        scale: '1',
                    },
                },

                'nav-main-scroll': {
                    '0%': {
                        translate: 'calc(-10em - var(--size-3)) 0',
                    },

                    '20%': {
                        translate: '-5em 0',
                    },

                    '100%': {
                        translate: '0 0',
                    },
                },
            },
        },
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
