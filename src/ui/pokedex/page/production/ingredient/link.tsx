import React from 'react';

import {useTranslations} from 'next-intl';

import {FlexLink} from '@/components/layout/flex/link';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {imageSmallIconSizes} from '@/styles/image';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';


type Props = {
  production: IngredientProduction,
};

export const PokemonProductionIngredientLink = ({production}: Props) => {
  const {id, qty} = production;

  const t = useTranslations('Game.Food');

  const ingredientName = t(id.toString());

  return (
    <FlexLink
      href={`/ingredient/${id}`}
      direction='col'
      center
      className="button-clickable-bg gap-0.5 p-1.5"
    >
      <IconWithInfo
        imageSrc={`/images/ingredient/${id}.png`}
        imageAlt={ingredientName}
        imageDimension="h-12 w-12"
        imageSizes={imageSmallIconSizes}
        info={qty}
      />
      <div className="whitespace-nowrap text-sm">
        {ingredientName}
      </div>
    </FlexLink>
  );
};
