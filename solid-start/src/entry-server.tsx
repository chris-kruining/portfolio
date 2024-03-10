import { createHandler, StartServer } from '@solidjs/start/server';
import favicon from '~/favicon.ico';

export default createHandler(() => (
    <StartServer
        document={({ assets, children, scripts }) => {
            return (
                <html lang="en" class="m-0 p-0 w-full h-full">
                    <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href={favicon} />
                        {assets}
                    </head>
                    <body class="m-0 p-0 w-full h-full">
                        {children}
                        {scripts}
                    </body>
                </html>
            );
        }}
    />
));
