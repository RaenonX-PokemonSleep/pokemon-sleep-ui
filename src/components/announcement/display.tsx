'use client';
import React from 'react';

import {clsx} from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {AnnouncementProps} from '@/components/announcement/type';
import {useLayout} from '@/hooks/layout/main';
import {announcementTextClasses} from '@/styles/text/announcement';
import {AnnouncementClient} from '@/types/mongo/announcement';

// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import styles from './main.module.css';


type Props = AnnouncementProps & {
  announcements: AnnouncementClient[],
};

export const AnnouncementsDisplay = ({larger, showOn, height, announcements}: Props) => {
  const [idx, setIdx] = React.useState(0);
  const {isLandscape} = useLayout();

  if ((showOn === 'landscape' && !isLandscape) || (showOn === 'portrait' && isLandscape)) {
    return null;
  }

  // Could be `undefined` if `idx` goes out of bound
  // - This could happen if the user switch to the other language with less site alerts
  // Reference: https://github.com/RaenonX-DL/dragalia-site-front/issues/253
  const announcement = announcements[idx] as AnnouncementClient | undefined;

  if (!announcement) {
    setIdx(0);
    return null;
  }

  const {message, level} = announcement;
  const announcementClass = clsx(larger ? 'announcement-lg' : 'announcement');

  return (
    <div onAnimationIteration={() => setIdx((idx + 1) % announcements.length)} className={clsx(
      'flex-row items-stretch overflow-hidden',
      height,
      announcementClass,
      styles['announcement-animation'],
    )}>
      <div className={clsx('items-center', announcementClass, announcementTextClasses[level])}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};
