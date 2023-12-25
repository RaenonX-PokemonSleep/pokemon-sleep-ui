import React from 'react';

import {useTranslations} from 'next-intl';

import {Link} from '@/components/i18n/exports';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageGallerySizes, imageSmallIconSizes} from '@/styles/image';


export const NavListHome = () => {
  const t = useTranslations('UI.Metadata');

  const rankBallId = Date.now() % 4 + 1;

  return (
    <Link href="/" className="button-clickable-bg group">
      <div className="relative h-48 w-full">
        <NextImage
          src="/images/theme/3iggs.png" alt="Nav Theme"
          sizes={imageGallerySizes} className="rounded-lg opacity-50 dark:opacity-25"
          priority
        />
      </div>
      <Flex center className="absolute left-0 top-0 z-10 h-full gap-1.5">
        <div className="relative h-12 w-12">
          <NextImage src={`/images/rank/${rankBallId}.png`} alt={t('Home.Title')} sizes={imageSmallIconSizes}/>
        </div>
        <div className="text-center">
          {t('Site.Name')}
        </div>
      </Flex>
    </Link>
  );
};
