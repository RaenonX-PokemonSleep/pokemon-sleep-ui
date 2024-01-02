import React from 'react';

import {clsx} from 'clsx';
import Script from 'next/script';
import {getServerSession} from 'next-auth';
// eslint-disable-next-line camelcase
import {unstable_setRequestLocale} from 'next-intl/server';
import {Toaster} from 'react-hot-toast';

import {adsClientId} from '@/components/ads/const';
import {AdsGap} from '@/components/ads/gap';
import {Announcements} from '@/components/announcement/main';
import {setLocale} from '@/components/i18n/exports';
import {I18nProvider} from '@/components/i18n/provider';
import {Loading} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {DocsAutoLink} from '@/components/shared/docs/autoLink/main';
import {authOptions} from '@/const/auth';
import {AdsLayout} from '@/ui/base/layout/ads';
import {UiPageProps} from '@/ui/base/layout/type';
import {NavListContent} from '@/ui/base/navbar/list/content';
import {NavBar} from '@/ui/base/navbar/main';
import {isAdsShouldShow} from '@/utils/environment';


export const PageLayout = ({
  announcement = true,
  children,
  ...props
}: React.PropsWithChildren<UiPageProps>) => {
  const {locale} = props;

  unstable_setRequestLocale(locale);
  setLocale(locale);

  const session = React.use(getServerSession(authOptions));
  const adsShouldShow = isAdsShouldShow(session);

  return (
    <>
      {/* Google AdSense */}
      {
        adsShouldShow &&
        <Script
          async
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClientId}`}
          crossOrigin="anonymous"
        />
      }
      <I18nProvider locale={locale} namespaces={[]}>
        <Toaster position="bottom-center" toastOptions={{duration: 3000}}/>
      </I18nProvider>
      <Flex direction="row" stretch className={clsx(
        'nav-bar-height sticky top-0 z-nav gap-1.5 border-b border-b-gray-700 bg-slate-300/90 dark:bg-slate-900/90',
      )}>
        <NavBar announcement={announcement} {...props}/>
      </Flex>
      <Flex direction="row">
        <Flex noFullWidth className={clsx(
          'sticky top-[var(--nav-bar-height)] hidden h-[calc(100vh-var(--nav-bar-height))] w-96 lg:flex',
        )}>
          <I18nProvider locale={locale} namespaces={['UI.Metadata']}>
            <NavListContent/>
          </I18nProvider>
        </Flex>
        <div className="h-full w-full overflow-y-auto">
          <Flex className="gap-1.5 p-2">
            {announcement && <Announcements showOn="portrait" height="h-10"/>}
            <DocsAutoLink locale={locale}/>
            <React.Suspense fallback={<Loading/>}>
              {children}
            </React.Suspense>
            <AdsGap show={adsShouldShow}/>
          </Flex>
        </div>
      </Flex>
      <Flex className="info-section-opaque fixed bottom-0 z-nav">
        <AdsLayout adsShouldShow={adsShouldShow}/>
      </Flex>
    </>
  );
};
