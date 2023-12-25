import React from 'react';

import {useLocale} from 'next-intl';

import {usePathname, useRouter} from '@/components/i18n/exports';


export const useLanguageSwitch = () => {
  const currentLocale = useLocale();
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const onLocaleSwitch = (nextLocale: string) => {
    startTransition(() => {
      router.push(pathname, {locale: nextLocale, scroll: false});
    });
  };

  return {currentLocale, isPending, onLocaleSwitch};
};
