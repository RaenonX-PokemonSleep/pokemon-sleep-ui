import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';

import {AnnouncementsDisplay} from '@/components/announcement/display';
import {InputBox} from '@/components/input/box';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {DeleteButton} from '@/components/shared/common/button/delete';
import {announcementLevelToText} from '@/const/announcement';
import {localeName} from '@/const/website';
import {textFilterButtonStyle} from '@/styles/input';
import {announcementTextClasses} from '@/styles/text/announcement';
import {AnnouncementClient, announcementLevels} from '@/types/mongo/announcement';
import {locales} from '@/types/next/locale';
import {AdminAnnouncementModifyProps} from '@/ui/admin/announcement/type';
import {toLocalIsoTimestampString, toUtcIsoTimestampString} from '@/utils/date';


type Props = AdminAnnouncementModifyProps & {
  show: boolean,
  data: AnnouncementClient,
};

export const AdminAnnouncementUnit = ({show, data, onUpdate, onDelete}: Props) => {
  const {
    uuid,
    message,
    expiry,
    order,
  } = data;

  return (
    <AnimatedCollapseQuick appear show={show}>
      <Flex className="info-section-bg gap-1.5 rounded-lg p-3">
        <AnnouncementsDisplay showOn="always" height="h-10" announcements={[data]}/>
        <InputBox
          type="text"
          value={message}
          onChange={({target}) => onUpdate(uuid, {message: target.value})}
          className="w-full"
        />
        <FilterTextInput
          title="Locale"
          ids={[...locales]}
          idToText={(locale) => localeName[locale]}
          isActive={(locale) => data.locale.includes(locale)}
          onClick={(locale) => {
            const originallyIncluded = data.locale.includes(locale);

            if (originallyIncluded) {
              onUpdate(uuid, {locale: data.locale.filter((localeInData) => localeInData !== locale)});
            } else {
              onUpdate(uuid, {locale: [...data.locale, locale]});
            }
          }}
        />
        <FilterExpandedInput
          title="Level"
          ids={[...announcementLevels]}
          idToButton={(level) => (
            <span className={announcementTextClasses[level]}>
              {announcementLevelToText[level]}
            </span>
          )}
          isActive={(level) => data.level === level}
          onClick={(level) => onUpdate(uuid, {level})}
          className={textFilterButtonStyle}
        />
        <Flex className="items-center lg:flex-row lg:justify-between">
          <Flex noFullWidth direction="row" className="gap-2 self-end">
            <Flex noFullWidth direction="row" className="items-center gap-1">
              <ClockIcon className="h-6 w-6"/>
              <InputBox
                type="datetime-local"
                className="text-center"
                value={toLocalIsoTimestampString(expiry) ?? ''}
                onChange={({target}) => onUpdate(
                  uuid,
                  {expiry: target.value ? toUtcIsoTimestampString(target.value) : null},
                )}
              />
            </Flex>
            <Flex noFullWidth direction="row" className="items-center gap-1">
              <Bars3BottomLeftIcon className="h-6 w-6"/>
              <InputBox
                type="number"
                className="w-28 text-center"
                value={order}
                onChange={({target}) => {
                  const order = parseInt(target.value || '0');

                  if (isNaN(order)) {
                    return;
                  }

                  onUpdate(uuid, {order});
                }}
              />
            </Flex>
            <DeleteButton dimension="h-7 w-7" onClick={() => onDelete(uuid)}/>
          </Flex>
        </Flex>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
