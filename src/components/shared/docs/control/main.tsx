'use client';
import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import {useRouter} from '@/components/i18n/exports';
import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {DocsControlDeleteButton} from '@/components/shared/docs/control/delete';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {Locale} from '@/types/next/locale';


type Props = {
  locale: Locale,
  path?: string,
  isCmsMod: boolean,
};

export const DocsControl = ({locale, path, isCmsMod}: Props) => {
  const [show, setShow] = React.useState(false);
  const {push} = useRouter();
  const {actAsync, status} = useUserDataActor();

  if (!actAsync || !isCmsMod) {
    return null;
  }

  return (
    <InputRow className="justify-end">
      {
        path &&
        <>
          <PopupCommon show={show} setShow={setShow}>
            <DocsControlDeleteButton status={status} onClick={async () => {
              const {status} = await actAsync({
                action: 'upload',
                options: {
                  type: 'cms.docs.delete',
                  data: {locale, path},
                },
              });

              if (status === 'completed') {
                push('/docs');
              }
            }}/>
          </PopupCommon>
          <button className="button-clickable-alert h-8 w-14" onClick={() => setShow(true)}>
            <Flex center className="h-6 w-6">
              <UserActionStatusIcon status={status} onWaitingOverride={<TrashIcon/>}/>
            </Flex>
          </button>
        </>
      }
      <a href="/docs/new" className="button-clickable-bg h-8 w-14">
        <Flex center className="h-full">
          <PlusCircleIcon className="h-6 w-6"/>
        </Flex>
      </a>
      {
        path &&
        <a href={`/docs/edit/${path}`} className="button-clickable-bg h-8 w-14">
          <Flex center className="h-full">
            <PencilIcon className="h-6 w-6"/>
          </Flex>
        </a>
      }
    </InputRow>
  );
};
