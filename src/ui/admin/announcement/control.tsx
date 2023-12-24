import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';

import {InputRow} from '@/components/input/filter/row';
import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {AnnouncementClientMap} from '@/types/mongo/announcement';


type Props = {
  announcementMap: AnnouncementClientMap,
  onCreateClick: () => void,
};

export const AdminAnnouncementControl = ({announcementMap, onCreateClick}: Props) => {
  return (
    <InputRow className="justify-end">
      <ClickableIconButton onClick={onCreateClick}>
        <PlusCircleIcon/>
      </ClickableIconButton>
      <UserDataUploadButton opts={{
        type: 'admin.announcements',
        data: announcementMap,
      }}/>
    </InputRow>
  );
};
