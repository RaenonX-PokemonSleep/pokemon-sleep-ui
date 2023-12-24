import React from 'react';

import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon';
import Bars3BottomLeftIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeInBox} from '@/types/game/pokebox/main';
import {SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/targets/type';


type Props = SkillTriggerAnalysisCommonProps & {
  disableSort: boolean,
  onSort: () => void,
  onPokeInBoxPicked: (pokeInBox: PokeInBox) => void,
  isPokeInBoxIncluded: (pokeInBox: PokeInBox) => boolean,
};

export const SkillTriggerAnalysisTargetControl = ({
  disableSort,
  onSort,
  onPokeInBoxPicked,
  isPokeInBoxIncluded,
  ...opts
}: Props) => {
  const [show, setShow] = React.useState(false);

  const commonStyle = 'h-9 w-9 p-1';

  return (
    <Flex direction="row" className="justify-end gap-1.5">
      <PokeboxImporter
        {...opts}
        onPokeboxPicked={(pokeInBox) => {
          onPokeInBoxPicked(pokeInBox);
          setShow(false);
        }}
        show={show}
        setShow={setShow}
        isPokeInBoxIncluded={isPokeInBoxIncluded}
      />
      <button onClick={() => setShow(true)} className={clsx('button-clickable-bg', commonStyle)}>
        <InboxArrowDownIcon/>
      </button>
      <button onClick={onSort} disabled={disableSort} className={clsx(
        'enabled:button-clickable-bg disabled:button-disabled',
        commonStyle,
      )}>
        <Bars3BottomLeftIcon/>
      </button>
    </Flex>
  );
};
