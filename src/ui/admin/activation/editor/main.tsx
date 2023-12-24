import React from 'react';

import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {activationContactToText, activationTypeToText} from '@/const/activation/common';
import {textFilterButtonStyle} from '@/styles/input';
import {
  activationContact,
  ActivationPropertiesAtClient,
  activationSource,
  activationType,
} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus} from '@/types/userData/main';
import {toLocalIsoTimestampString, toUtcIsoTimestampString} from '@/utils/date';
import {isActivationDataValid} from '@/utils/user/activation/utils';


type Props = {
  data: ActivationPropertiesAtClient,
  setData: ReactStateUpdaterFromOriginal<ActivationPropertiesAtClient>,
  status: UserDataActionStatus,
  onSubmit: (data: ActivationPropertiesAtClient) => void,
};

export const ActivationEditor = ({
  data,
  setData,
  status,
  onSubmit,
}: Props) => {
  const {
    expiry,
    contact,
    note,
  } = data;
  const commonInputStyle = 'h-8 w-full sm:w-96';

  const isCmsMod = data.isCmsMod ?? false;
  const isActivationLocked = data.isActivationLocked ?? false;
  const isFrozen = data.isFrozen ?? false;

  return (
    <FlexForm className="gap-1.5" onSubmit={async () => {
      const activationDataValid = isActivationDataValid(data);
      if (!activationDataValid) {
        return;
      }

      onSubmit(data);
    }}>
      <InputRowWithTitle title="Expiry">
        <InputBox
          type="datetime-local"
          value={toLocalIsoTimestampString(expiry) ?? ''}
          className={commonInputStyle}
          onChange={({target}) => setData((original) => ({
            ...original,
            expiry: toUtcIsoTimestampString(target.value),
          } satisfies ActivationPropertiesAtClient))}
        />
      </InputRowWithTitle>
      <FilterTextInput
        title="Activation"
        ids={[...activationType]}
        idToText={(activation) => activationTypeToText[activation]}
        {...getMultiSelectOnClickProps({
          filter: data,
          setFilter: setData,
          filterKey: 'activation',
        })}
      />
      <FilterTextInput
        title="Source"
        ids={[...activationSource]}
        idToText={(source) => activationContactToText[source]}
        {...getSingleSelectOnClickProps({
          filter: data,
          setFilter: setData,
          filterKey: 'source',
        })}
      />
      {[...activationContact].map((platform) => (
        <InputRowWithTitle key={platform} title={activationContactToText[platform]}>
          <InputBox
            type="text"
            value={contact[platform] ?? ''}
            className={commonInputStyle}
            onChange={({target}) => setData((original) => ({
              ...original,
              contact: {
                ...original.contact,
                [platform]: target.value || null,
              },
            } satisfies ActivationPropertiesAtClient))}
          />
        </InputRowWithTitle>
      ))}
      <InputRowWithTitle title="Properties">
        <Flex direction="row" wrap noFullWidth className="gap-1">
          <ToggleButton
            active={isCmsMod}
            onClick={() => setData((original) => ({
              ...original,
              isCmsMod: !original.isCmsMod,
            } satisfies ActivationPropertiesAtClient))}
            className={textFilterButtonStyle}
          >
            CMS Mod
          </ToggleButton>
          <ToggleButton
            active={isActivationLocked}
            onClick={() => setData((original) => ({
              ...original,
              isActivationLocked: !original.isActivationLocked,
            } satisfies ActivationPropertiesAtClient))}
            className={textFilterButtonStyle}
          >
            Activation Locked (Founder)
          </ToggleButton>
          <ToggleButton
            active={isFrozen}
            onClick={() => setData((original) => ({
              ...original,
              isFrozen: !original.isFrozen,
            } satisfies ActivationPropertiesAtClient))}
            className={textFilterButtonStyle}
          >
            Frozen
          </ToggleButton>
        </Flex>
      </InputRowWithTitle>
      <InputRowWithTitle title="Note">
        <InputBox
          type="text"
          value={note}
          className={commonInputStyle}
          onChange={({target}) => setData((original) => ({
            ...original,
            note: target.value,
          } satisfies ActivationPropertiesAtClient))}
        />
      </InputRowWithTitle>
      <InputRow className="justify-end gap-1.5">
        <button type="submit" disabled={status !== 'waiting'} className={clsx(
          'button-clickable-bg disabled:button-disabled h-8 w-8 p-1',
        )}>
          <UserActionStatusIcon status={status}/>
        </button>
      </InputRow>
    </FlexForm>
  );
};
