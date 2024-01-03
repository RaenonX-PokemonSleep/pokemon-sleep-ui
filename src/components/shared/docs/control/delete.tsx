import React from 'react';

import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import {Flex} from '@/components/layout/flex/common';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {UserDataActionStatus} from '@/types/userData/main';


type Props = {
  status: UserDataActionStatus,
  onClick: () => void,
};

export const DocsControlDeleteButton = ({status, onClick}: Props) => {
  return (
    <button className="button-clickable-alert h-8 w-14" onClick={onClick}>
      <Flex center className="h-6 w-6">
        <UserActionStatusIcon status={status} onWaitingOverride={<TrashIcon/>}/>
      </Flex>
    </button>
  );
};
