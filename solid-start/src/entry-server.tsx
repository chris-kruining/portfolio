import { createHandler, StartServer } from "@solidjs/start/server";
import favicon from '~/../public/favicon.ico';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={favicon} />
          {assets}
        </head>
        <body>
          {children}
          {scripts}
        </body>
      </html>
    )
  }}  />
));
