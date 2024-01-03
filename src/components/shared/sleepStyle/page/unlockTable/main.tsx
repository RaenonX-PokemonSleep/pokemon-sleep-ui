import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Flex} from '@/components/layout/flex/common';
import {MapCommonProps, MapInputInclusionKey, MapPageFilter} from '@/components/shared/sleepStyle/page/type';
import {MapUnlockTableRow} from '@/components/shared/sleepStyle/page/unlockTable/row';
import {MapUnlockAccumulator, MapUnlockTableData} from '@/components/shared/sleepStyle/page/unlockTable/type';
import {getUpdatedAccumulator} from '@/components/shared/sleepStyle/page/unlockTable/utils';
import {getPossibleRanks} from '@/components/shared/sleepStyle/page/utils';
import {SleepdexMap} from '@/types/game/sleepdex';
import {isInSleepdex} from '@/utils/game/sleepdex';
import {getSnorlaxDataAtRank, isSameRank} from '@/utils/game/snorlax';


type Props = Pick<
  MapCommonProps,
  'mapId' | 'pokedexMap' | 'sleepStyles' | 'snorlaxData' | 'isLoggedIn'
> & {
  filter: MapPageFilter,
  isIncluded: FilterInclusionMap<MapInputInclusionKey>,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};

export const MapUnlockTable = (props: Props) => {
  const {
    pokedexMap,
    sleepStyles,
    snorlaxData,
    filter,
    isIncluded,
    sleepdex,
  } = props;
  const {showEmptyRank, showLockedOnly} = filter;

  let accumulator: MapUnlockAccumulator = {
    unlocked: {},
    unlockable: {},
    energy: {
      previous: null,
      current: null,
    },
  };

  return (
    <Flex className="gap-1">
      {getPossibleRanks().map((rank) => {
        const matchingStyles = sleepStyles
          .filter(({pokemonId, style}) => (
            isIncluded[`${pokemonId}-${style.style}`] &&
            isSameRank(style.rank, rank)
          ));

        const toHide = !showEmptyRank && !matchingStyles.length;
        const key = `${rank.title}-${rank.number}`;

        const currentSnorlaxDataAtRank = getSnorlaxDataAtRank({snorlaxData, rank});
        const current = {
          rank,
          value: currentSnorlaxDataAtRank?.energy ?? null,
        };

        // Update accumulator outside once to update energy
        // https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/258
        accumulator = getUpdatedAccumulator({
          original: accumulator,
          current,
        });

        for (const data of matchingStyles) {
          const {pokemonId} = data;
          const pokemon = pokedexMap[pokemonId];

          if (!pokemon) {
            continue;
          }

          const {sleepType} = pokemon;

          accumulator = getUpdatedAccumulator({
            original: accumulator,
            sleepType,
            current,
            inSleepdexOpts: {
              pokemonId: data.pokemonId,
              styleId: data.style.style,
              sleepdex,
            },
          });
        }

        const sleepStyleData: MapUnlockTableData[] = matchingStyles.map((data) => ({
          ...data,
          show: showLockedOnly || !isInSleepdex({
            pokemonId: data.pokemonId,
            styleId: data.style.style,
            sleepdex,
          }),
        }));

        if (!currentSnorlaxDataAtRank) {
          return null;
        }

        return (
          <MapUnlockTableRow
            key={key}
            show={!toHide}
            rank={rank}
            sleepStyleData={sleepStyleData}
            accumulator={accumulator}
            snorlaxDataAtRank={currentSnorlaxDataAtRank}
            {...props}
          />
        );
      })}
    </Flex>
  );
};
