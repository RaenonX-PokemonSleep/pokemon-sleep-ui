import React from 'react';

import {useTranslations} from 'next-intl';

import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {TeamAnalysisMember, TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisPokemon} from '@/ui/team/analysis/setup/pokemon/main';
import {TeamAnalysisFilledSlotProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledSlotProps;

export const TeamAnalysisFilledSlot = (props: Props) => {
  const {
    setSetup,
    pokemon,
    showPokemon,
  } = props;

  const t = useTranslations('UI.Metadata.Pokedex');
  const t2 = useTranslations('Game.PokemonName');

  const setTeamMember = React.useCallback((slotName: TeamAnalysisSlotName, update: Partial<TeamAnalysisMember>) => {
    // `merge()` keeps the original value if the `update` is undefined, but `update` should overwrite it
    setSetup((original) => ({
      ...original,
      comps: {
        ...original.comps,
        [original.config.current]: {
          ...original.comps[original.config.current],
          members: {
            ...original.comps[original.config.current].members,
            [slotName]: {
              ...original.comps[original.config.current].members[slotName],
              ...update,
            },
          },
        },
      },
    }));
  }, [setSetup]);

  return (
    <>
      <button
        className="button-clickable group absolute left-1 top-1 h-6 w-6 rounded-full"
        onClick={() => showPokemon(pokemon)}
      >
        <GenericPokeballIcon alt={t('Page.Title', {name: t2(pokemon.id.toString())})} noWrap/>
      </button>
      <TeamAnalysisPokemon setMember={setTeamMember} {...props}/>
    </>
  );
};
