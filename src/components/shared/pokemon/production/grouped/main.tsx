import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericBerryIcon} from '@/components/shared/icon/berry';
import {GenericIngredientIcon} from '@/components/shared/icon/ingredient';
import {PokemonBerryProduction} from '@/components/shared/pokemon/production/berry';
import {PokemonGroupedProductionCategory} from '@/components/shared/pokemon/production/grouped/category';
import {PokemonIngredientProduction} from '@/components/shared/pokemon/production/ingredient';
import {PokemonProducingRateByType} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';


type Props = {
  grouped: PokemonProducingRateByType,
};

export const PokemonGroupedProduction = ({grouped}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');
  const genericIconDimension: Dimension = 'h-8 w-8';

  return (
    <Flex className="button-bg gap-1 rounded-lg p-2">
      <PokemonGroupedProductionCategory
        icon={<GenericBerryIcon alt={t('Berry')} noWrap/>}
        data={Object.entries(grouped.berry).map(([id, rate]) => ({id: Number(id), rate}))}
        getReactNode={(id, rate) => (
          <div className="px-4">
            <PokemonBerryProduction key={id} id={Number(id)} rate={rate}/>
          </div>
        )}
        dimension={genericIconDimension}
        showQuantity={false}
      />
      <HorizontalSplitter/>
      <PokemonGroupedProductionCategory
        icon={<GenericIngredientIcon alt={t('Ingredient')} noWrap/>}
        data={Object.entries(grouped.ingredient)
          .map(([id, rate]) => ({id: Number(id), rate}))
          .filter(({rate}) => !!rate?.quantity)}
        getReactNode={(id, rate) => (
          <div className="px-4">
            <PokemonIngredientProduction key={id} id={Number(id)} rate={rate}/>
          </div>
        )}
        dimension={genericIconDimension}
        showQuantity
      />
    </Flex>
  );
};
