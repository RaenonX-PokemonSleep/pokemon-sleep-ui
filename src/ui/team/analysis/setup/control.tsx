import React from 'react';

import RectangleStackIcon from '@heroicons/react/24/outline/RectangleStackIcon';
import cloneDeep from 'lodash/cloneDeep';
import {useSession} from 'next-auth/react';
import {v4} from 'uuid';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {TeamAnalysisComp} from '@/types/teamAnalysis';
import {TeamAnalysisCompSelector} from '@/ui/team/analysis/comp/main';
import {TeamAnalysisSetupModifyingProps} from '@/ui/team/analysis/type';
import {getDefaultTeamName, getTeamName} from '@/ui/team/analysis/utils';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const TeamAnalysisSetupControl = ({setup, setSetup, currentTeam}: TeamAnalysisSetupModifyingProps) => {
  const {status} = useSession();
  const [setupSelector, setSetupSelector] = React.useState({
    show: false,
    setup,
  });

  const onSelect = (selected?: string) => {
    // Not using `() => value` state updater because data should be taken from `setupSelector` instead
    setSetup({
      ...setupSelector.setup,
      config: {
        ...setupSelector.setup.config,
        current: selected ?? setupSelector.setup.config.current,
      },
    });
    setSetupSelector((original) => ({
      ...original,
      show: false,
    }));
  };

  return (
    <InputRow className="justify-end gap-1.5">
      <PopupCommon show={setupSelector.show} setShow={() => onSelect()}>
        <TeamAnalysisCompSelector
          setup={setupSelector.setup}
          onUpdated={(setup) => setSetupSelector((original) => ({
            ...original,
            setup,
          }))}
          onPicked={onSelect}
          onDeleted={(deleted) => setSetupSelector((original) => {
            const setup = {...original.setup};
            delete setup.comps[deleted];

            return {show: true, setup};
          })}
          onAdded={(newTeam) => setSetupSelector((original) => cloneMerge(
            original,
            {setup: {comps: {[newTeam.uuid]: newTeam}}},
          ))}
          onCopied={(sourceUuid) => setSetupSelector((original) => {
            const uuid = v4();
            const newTeam: TeamAnalysisComp = {
              ...cloneDeep(original.setup.comps[sourceUuid]),
              uuid,
              name: getDefaultTeamName(uuid),
            };

            return cloneMerge(
              original,
              {setup: {comps: {[uuid]: newTeam}}},
            );
          })}
        />
      </PopupCommon>
      <button
        className="enabled:button-clickable-bg disabled:button-disabled relative h-8 px-2"
        disabled={status !== 'authenticated'}
        onClick={() => setSetupSelector({show: true, setup})}
      >
        <Flex direction="row" center className="gap-1.5">
          <RectangleStackIcon className="h-7 w-7"/>
          <div>
            {getTeamName(currentTeam)}
          </div>
        </Flex>
      </button>
      <UserDataUploadButton
        opts={{
          type: 'teamAnalysis',
          data: {
            config: setup.config,
            comps: Object.values(setup.comps),
          },
        }}
      />
    </InputRow>
  );
};
