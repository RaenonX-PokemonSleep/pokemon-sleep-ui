import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextLink} from '@/components/shared/common/link/main';
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
    <NextLink href={`/ingredient/${id}`} className="button-clickable-bg p-1.5">
      <Flex center className="gap-0.5">
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
      </Flex>
    </NextLink>
  );
};
