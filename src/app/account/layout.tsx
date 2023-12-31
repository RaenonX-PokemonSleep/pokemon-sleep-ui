/* eslint-disable new-cap */
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import '../globals.css';


const RootLayout = ({children}: React.PropsWithChildren) => {
  return (
    <html className="h-full" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
