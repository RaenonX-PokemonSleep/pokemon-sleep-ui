import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {getMultiSelectOnClickProps, getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonMapFilter} from '@/components/shared/pokemon/filter/map';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {pokedexSortExclusion} from '@/components/shared/pokemon/sorter/type';
import {isPokedexSortExclusion} from '@/components/shared/pokemon/sorter/utils';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {useUserActivation} from '@/hooks/userData/activation';
import {PokedexInputClearer} from '@/ui/pokedex/index/input/clearer';
import {displayTypeToI18nId} from '@/ui/pokedex/index/input/const';
import {pokedexDisplayType, PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexDataProps} from '@/ui/pokedex/index/type';
import {toUnique} from '@/utils/array';


type Props = PokedexInputProps & PokedexDataProps;

export const PokedexInput = ({pokedex, maxLevel, ...props}: Props) => {
  const {
    filter,
    setFilter,
    preloaded,
    subSkillMap,
  } = props;

  const t = useTranslations('UI.InPage.Pokedex');
  const collapsible = useCollapsible();
  const {data} = useSession();
  const {isPremium} = useUserActivation(data);

  return (
    <Flex className="gap-1">
      <div className="relative">
        <Collapsible state={collapsible} classNameForHeight="h-80 md:h-72" button={
          <Flex direction="row" center className="gap-0.5">
            <FunnelIcon className="h-6 w-6"/>
          </Flex>
        }>
          <div className="absolute bottom-2 right-6 z-10">
            <PokedexInputClearer setFilter={setFilter} preloadedDisplay={preloaded.display}/>
          </div>
          <Flex className="gap-1 pr-1">
            <PokemonMapFilter
              highlight
              mapIds={toUnique(pokedex
                .flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId)))
                .sort((a, b) => a - b)}
              {...getMultiSelectOnClickProps({
                filter,
                setFilter,
                filterKey: 'mapId',
              })}
            />
            <InputRowWithTitle title={t('Info.Name')}>
              <InputBox type="text" value={filter.name} onChange={({target}) => setFilter((original) => ({
                ...original,
                name: target.value,
              }))}/>
            </InputRowWithTitle>
            <PokemonFilter
              pokemonList={pokedex}
              skipLevelInput
              {...props}
            />
            <SnorlaxFavoriteInput
              filterKey="snorlaxFavorite"
              pokemonList={pokedex}
              {...props}
            />
            <FilterTextInput
              title={
                <Flex center>
                  <InformationCircleIcon className="h-6 w-6"/>
                </Flex>
              }
              ids={[...pokedexDisplayType].filter((displayType) => !isPokedexSortExclusion(displayType))}
              idToText={(display) => t(displayTypeToI18nId[display])}
              {...getSingleSelectOnClickProps({
                filter,
                setFilter,
                filterKey: 'display',
                allowNull: false,
              })}
            />
            <PokemonSortingPicker
              sort={filter.sort}
              updateSort={(sort) => setFilter((original) => ({
                ...original,
                sort,
              } satisfies PokedexInputProps['filter']))}
              exclude={[...pokedexSortExclusion]}
            />
          </Flex>
        </Collapsible>
      </div>
      <PokemonIndividualParamsPicker
        filter={filter}
        setFilter={setFilter}
        maxLevel={maxLevel}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="bg-plate"
      />
    </Flex>
  );
};
