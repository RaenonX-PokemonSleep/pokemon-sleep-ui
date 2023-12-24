import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


export const AdBlockWarning = () => {
  const t = useTranslations('UI.Subscription');

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={clsx(
      'flex h-full w-full flex-col items-center justify-center text-center text-xl',
    )}>
      {t('AdBlockActive')}
    </ReactMarkdown>
  );
};
