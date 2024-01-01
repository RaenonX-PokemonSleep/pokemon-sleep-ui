import React from 'react';

import {InboxArrowDownIcon} from '@heroicons/react/24/outline';
import CloudArrowDownIcon from '@heroicons/react/24/outline/CloudArrowDownIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokeboxImporter} from '@/components/shared/pokebox/importer/main';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokemonVanillaPopup} from '@/components/shared/pokemon/vanillaPopup/main';
import {PokemonInfo} from '@/types/game/pokemon';
import {TeamAnalysisMember} from '@/types/teamAnalysis';
import {TeamAnalysisCloudPull} from '@/ui/team/analysis/popup/cloudPull';
import {TeamAnalysisEmptySlotPopupType} from '@/ui/team/analysis/setup/team/type';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxImporterCommonProps & {
  onCloudPulled: (member: TeamAnalysisMember) => void,
  onPokemonSelected: (pokemon: PokemonInfo) => void,
};

export const TeamAnalysisEmptySlot = ({
  onCloudPulled,
  onPokemonSelected,
  ...props
}: Props) => {
  const {pokedexMap} = props;

  const [popup, setPopup] = React.useState<TeamAnalysisEmptySlotPopupType | null>(null);
  const {status} = useSession();

  const buttonClass = 'enabled:button-clickable-bg disabled:button-disabled p-1 h-9 w-9';
  const buttonDisabled = status !== 'authenticated';

  return (
    <Flex center className="gap-1.5">
      <PokeboxImporter
        show={popup === 'pokebox'}
        setShow={(show) => setPopup(show ? 'pokebox' : null)}
        {...props}
      />
      <PopupCommon
        show={popup === 'cloudPull'}
        setShow={(show) => setPopup(show ? 'cloudPull' : null)}
      >
        <TeamAnalysisCloudPull onCloudPulled={onCloudPulled}/>
      </PopupCommon>
      <PokemonVanillaPopup
        show={popup === 'vanilla'}
        setShow={(show) => setPopup(show ? 'vanilla' : null)}
        pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
        onPokemonSelected={onPokemonSelected}
        {...props}
      />
      <UnavailableIcon/>
      <Flex direction="row" center className="gap-1.5">
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('vanilla')}>
          <PlusCircleIcon/>
        </button>
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('pokebox')}>
          <InboxArrowDownIcon/>
        </button>
        <button className={buttonClass} disabled={buttonDisabled} onClick={() => setPopup('cloudPull')}>
          <CloudArrowDownIcon/>
        </button>
      </Flex>
    </Flex>
  );
};
