'use client';
import React from 'react';

import {v4} from 'uuid';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {localeName} from '@/const/website';
import {Locale, locales} from '@/types/next/locale';
import {AdminAnnouncementControl} from '@/ui/admin/announcement/control';
import {AdminAnnouncementServerDataProps} from '@/ui/admin/announcement/type';
import {AdminAnnouncementUnit} from '@/ui/admin/announcement/unit';
import {isNotNullish} from '@/utils/type';


export const AdminAnnouncementClient = ({preloaded}: AdminAnnouncementServerDataProps) => {
  const [announcements, setAnnouncements] = React.useState(preloaded);
  const [previewLocale, setPreviewLocale] = React.useState<Locale | null>(null);

  return (
    <Flex className="gap-1.5">
      <FilterTextInput
        title="Locale"
        ids={[...locales]}
        idToText={(locale) => localeName[locale]}
        isActive={(locale) => locale === previewLocale}
        onClick={(locale) => setPreviewLocale(previewLocale === locale ? null : locale)}
      />
      {Object.values(announcements)
        .filter(isNotNullish)
        .sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
        .map((data) => (
          <AdminAnnouncementUnit
            key={data.uuid}
            show={!previewLocale || data.locale.includes(previewLocale)}
            data={data}
            onUpdate={(uuid, update) => setAnnouncements((original) => {
              const originalUnit = original[uuid];

              if (!originalUnit) {
                return original;
              }

              return {
                ...original,
                [uuid]: {...originalUnit, ...update},
              };
            })}
            onDelete={(uuid) => setAnnouncements((original) => {
              const updated = {...original};
              delete updated[uuid];

              return updated;
            })}
          />
        ))}
      <AdminAnnouncementControl
        announcementMap={announcements}
        onCreateClick={() => setAnnouncements((original) => {
          const uuid = v4();

          return {
            ...original,
            [uuid]: {
              uuid,
              message: '',
              locale: previewLocale ? [previewLocale] : [],
              level: 'info',
              expiry: null,
            },
          };
        })}
      />
    </Flex>
  );
};
