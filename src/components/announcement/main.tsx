import React from 'react';

import {useLocale} from 'next-intl';

import {AnnouncementsDisplay} from '@/components/announcement/display';
import {AnnouncementProps} from '@/components/announcement/type';
import {getAnnouncementsOfLocale} from '@/controller/announcement/main';
import {isLocale} from '@/utils/i18n';


export const Announcements = (props: AnnouncementProps) => {
  const locale = useLocale();
  const announcements = React.use(getAnnouncementsOfLocale(isLocale(locale) ? locale : null));

  if (!announcements.length) {
    return null;
  }

  return <AnnouncementsDisplay announcements={announcements} {...props}/>;
};
