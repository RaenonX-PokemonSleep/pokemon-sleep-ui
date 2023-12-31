/* eslint-disable new-cap */
import React from 'react';

// eslint-disable-next-line camelcase
import {Noto_Sans} from 'next/font/google';
import {notFound} from 'next/navigation';
import Script from 'next/script';

import {ReactDevTools} from '@/components/reactDevTools';
import {SiteTracking} from '@/components/tracking/main';
import {LocaleLayoutParams, LocaleLayoutProps} from '@/types/next/layout';
import {locales} from '@/types/next/locale';
import {GenerateStaticParamsFunc} from '@/types/next/static';
import {Providers} from '@/ui/base/providers';
import {isProduction} from '@/utils/environment';
import {isLocale} from '@/utils/i18n';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import '../globals.css';


export const generateStaticParams: GenerateStaticParamsFunc<LocaleLayoutParams> = async () => {
  return locales.map((locale) => ({locale}));
};

const font = Noto_Sans({
  weight: '400',
  subsets: ['latin'],
});

const RootLayout = ({children, params}: React.PropsWithChildren<LocaleLayoutProps>) => {
  const {locale} = params;

  // Show a 404 error if the user requests an unknown locale
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      {/* Google Analytics */}
      {isProduction() && (
        <>
          <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-2LL7T4CCZP"/>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2LL7T4CCZP', {
                send_page_view: false,
                cookie_flags: 'samesite=none;secure'
              });
            `}
          </Script>
        </>
      )}
      <ReactDevTools/>
      <React.Suspense>
        <SiteTracking/>
      </React.Suspense>
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
