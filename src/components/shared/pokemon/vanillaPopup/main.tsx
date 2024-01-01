import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';

import {AdsUnit} from '@/components/ads/main';
import {useFilterInput} from '@/components/input/filter/hook';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {generatePokemonInputFilter, isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';


type Props = UsePokemonFilterCommonData & {
  show: boolean,
  setShow: (show: boolean) => void,
  pokemonList: PokemonInfo[],
  onPokemonSelected: (pokemon: PokemonInfo) => void,
};

export const PokemonVanillaPopup = ({
  show,
  setShow,
  pokemonList,
  onPokemonSelected,
  ...props
}: Props) => {
  const {ingredientMap} = props;
  const collapsible = useCollapsible(false);

  const {
    filter,
    setFilter,
    isIncluded,
  } = useFilterInput<PokemonInputFilter, PokemonInfo, PokemonId>({
    data: pokemonList,
    dataToId: ({id}) => id,
    initialFilter: generatePokemonInputFilter({isLevelAgnostic: true}),
    isDataIncluded: (filter, pokemon) => {
      return isPokemonIncludedFromFilter({filter, pokemon, ...props});
    },
  });

  return (
    <PopupCommon show={show} setShow={setShow}>
      <Flex className="gap-1.5 sm:w-[60vw] md:w-[50vw]">
        <AdsUnit/>
        <Collapsible state={collapsible} classNameForHeight="h-60" button={
          <Flex direction="row" center>
            <FunnelIcon className="h-6 w-6"/>
          </Flex>
        }>
          <PokemonFilter
            ingredientMap={ingredientMap}
            filter={filter}
            setFilter={setFilter}
            className="pr-1"
            pokemonList={pokemonList}
          />
        </Collapsible>
        <PokemonClickableIcons
          pokemonList={pokemonList.filter(({id}) => isIncluded[id])}
          onClick={onPokemonSelected}
        />
      </Flex>
    </PopupCommon>
  );
};
