import React from 'react';

import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {NextLink} from '@/components/shared/common/link/main';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonNameBig} from '@/components/shared/pokemon/name/big';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type Props = AnalysisPageCommonProps;

export const AnalysisMeta = ({pokemon}: Props) => {
  return (
    <Flex center className="info-section">
      <PokemonNameBig pokemon={pokemon}/>
      <div className="relative h-60 w-60">
        <PokemonImage pokemonId={pokemon.id} image="portrait" isShiny={false}/>
        <NextLink
          href={`/pokedex/${pokemon.id}`}
          className="button-clickable absolute bottom-0 right-0 h-7 w-7 rounded-full"
        >
          <InformationCircleIcon/>
        </NextLink>
      </div>
    </Flex>
  );
};
