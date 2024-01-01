import React from 'react';

import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';
import {
  TeamAnalysisMember,
  TeamAnalysisSetup,
  TeamAnalysisSlotName,
  teamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {toTeamAnalysisMemberFromVanilla} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {toTeamAnalysisMember} from '@/utils/team/toMember';
import {showToast} from '@/utils/toast';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  statsOfTeam: TeamProducingStats,
};

export const TeamAnalysisTeamView = (props: Props) => {
  const {
    setup,
    setSetup,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    statsOfTeam,
  } = props;

  const t = useTranslations('Game');
  const {members, snorlaxFavorite} = getCurrentTeam({setup});

  const setMember = React.useCallback((
    slotName: TeamAnalysisSlotName,
    member: TeamAnalysisMember,
  ) => {
    setSetup((original): TeamAnalysisSetup => ({
      ...original,
      comps: {
        ...original.comps,
        [original.config.current]: getCurrentTeam({
          setup: original,
          overrideSlot: slotName,
          overrideMember: member,
        }),
      },
    }));

    showToast({content: (
      <Flex direction="row" className="gap-1.5">
        <PlusCircleIcon className="h-9 w-9"/>
        <div className="relative h-9 w-9">
          <NextImage
            src={`/images/pokemon/icons/${member.pokemonId}.png`} alt={t(`PokemonName.${member.pokemonId}`)}
            sizes={imageIconSizes}
          />
        </div>
        <div className="self-end text-sm">
            #{member.pokemonId} @ {slotName}
        </div>
      </Flex>
    )});
  }, [setSetup, getCurrentTeam]);

  return (
    <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-3 xl:grid-cols-5">
      {teamAnalysisSlotName.map((slotName) => {
        const member = members[slotName];
        const pokemon = member ? pokedexMap[member.pokemonId] : undefined;
        const stats = statsOfTeam.bySlot[slotName];

        const isAvailable = member && pokemon && stats;

        return (
          <Flex key={slotName} center className={clsx(
            'button-bg relative gap-1.5 rounded-lg p-3',
          )}>
            <button
              className={clsx(
                'absolute right-1 top-1 z-10 h-5 w-5 rounded-full',
                'enabled:button-clickable disabled:button-disabled-border',
              )}
              disabled={!member}
              onClick={() => setSetup((original) => ({
                ...original,
                comps: {
                  ...original.comps,
                  [original.config.current]: getCurrentTeam({
                    setup: original,
                    overrideSlot: slotName,
                    overrideMember: null,
                  }),
                },
              }))}
            >
              <XMarkIcon/>
            </button>
            {isAvailable ?
              <TeamAnalysisFilledSlot
                {...props}
                snorlaxFavorite={snorlaxFavorite}
                slotName={slotName}
                member={member}
                stats={stats}
                pokemon={pokemon}
                pokemonProducingParams={getPokemonProducingParams({
                  pokemonId: pokemon.id,
                  pokemonProducingParamsMap,
                })}
              /> :
              <TeamAnalysisEmptySlot
                {...props}
                onPokeboxPicked={(pokeInBox) => setMember(slotName, toTeamAnalysisMember(pokeInBox))}
                onCloudPulled={(member) => setMember(slotName, member)}
                onPokemonSelected={(pokemon) => setMember(
                  slotName,
                  toTeamAnalysisMemberFromVanilla({
                    pokemon,
                    chain: ingredientChainMap[pokemon.ingredientChain],
                  }),
                )}
              />}
          </Flex>
        );
      })}
    </Grid>
  );
};
