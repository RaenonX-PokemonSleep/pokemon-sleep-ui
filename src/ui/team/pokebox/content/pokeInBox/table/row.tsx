import React from 'react';

import {isFilterIncludingSome} from '@/components/input/filter/utils/check';
import {Flex} from '@/components/layout/flex/common';
import {PokeInBoxTableFrequency} from '@/ui/team/pokebox/content/pokeInBox/table/details/frequency';
import {PokeInBoxTableInfo} from '@/ui/team/pokebox/content/pokeInBox/table/details/info';
import {PokeInBoxTableMaxCarry} from '@/ui/team/pokebox/content/pokeInBox/table/details/maxCarry';
import {PokeInBoxTablePokemon} from '@/ui/team/pokebox/content/pokeInBox/table/details/pokemon';
import {PokeInBoxTableProduction} from '@/ui/team/pokebox/content/pokeInBox/table/details/production';
import {PokeInBoxTableRating} from '@/ui/team/pokebox/content/pokeInBox/table/details/rating';
import {PokeInBoxTableSkills} from '@/ui/team/pokebox/content/pokeInBox/table/details/skills';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeInBoxTableRowHeader} from '@/ui/team/pokebox/content/pokeInBox/table/header';
import {PokeInBoxViewUnitProps} from '@/ui/team/pokebox/content/pokeInBox/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxDisplayType} from '@/ui/team/pokebox/viewer/type';
import {getPokemonProducingParams} from '@/utils/game/producing/params';


export const PokeInBoxTableRow = (props: PokeInBoxViewUnitProps) => {
  const {
    pokeInBox,
    pokedexMap,
    pokemonProducingParamsMap,
    display,
    isLevelPreview,
    onClick,
  } = props;
  const pokemon = pokedexMap[pokeInBox.pokemon];

  if (!pokemon) {
    return null;
  }

  const pokeInBoxProps: PokeInBoxCommonProps = {
    ...props,
    ratingBasis: display.ratingBasis,
    pokemon,
  };

  const rateOfPokemon = getRateOfPokemon(pokeInBoxProps);

  const detailProps: PokeInBoxTableDetailsProps = {
    ...pokeInBoxProps,
    isLevelPreview,
    rateOfPokemon,
    display,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
  };

  return (
    <Flex direction="row" className="gap-1">
      {/* `pokemon` comes later because `props` from upstream could contain `pokemon` as list of Pokémon */}
      <PokeInBoxTableRowHeader {...props} pokemon={pokemon}/>
      <button className="button-clickable-bg group rounded-lg p-1" onClick={onClick}>
        <Flex direction="row" noFullWidth className="items-center gap-1 [&>*]:shrink-0">
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['info'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTableInfo {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['pokemon'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTablePokemon {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['productionTotal', 'productionBerry', 'productionIngredient'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTableProduction {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['rating'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTableRating {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['skills'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTableSkills {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['frequency'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTableFrequency {...detailProps}/>}
          {isFilterIncludingSome({
            filter: display,
            filterKey: 'displayOfTable',
            ids: ['maxCarry'] satisfies PokeboxDisplayType[],
          }) && <PokeInBoxTableMaxCarry {...detailProps}/>}
        </Flex>
      </button>
    </Flex>
  );
};
