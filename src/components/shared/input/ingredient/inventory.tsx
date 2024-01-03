import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {NumberInputOptional} from '@/components/shared/input/number/optional/main';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {Ingredient, IngredientCounter, IngredientMap} from '@/types/game/ingredient';
import {toSum} from '@/utils/array';
import {isNotNullish, Nullable} from '@/utils/type';


type Props = {
  ingredientMap: IngredientMap,
  counter: IngredientCounter,
  minCount?: IngredientCounter,
  showIngredient: (ingredient: Ingredient) => boolean,
  onValueChanged: (ingredient: Ingredient, count: Nullable<number>) => void,
  onReset: () => void,
};

export const IngredientInventoryInput = ({
  ingredientMap,
  counter,
  minCount,
  showIngredient,
  onValueChanged,
  onReset,
}: Props) => {
  const t = useTranslations('UI.InPage.Cooking');

  return (
    <Flex className="info-section-bg gap-1 rounded-lg p-2">
      <Flex direction="row" wrap center noFullWidth className="gap-1">
        {Object.values(ingredientMap).filter(isNotNullish).map((ingredient) => {
          if (!showIngredient(ingredient)) {
            return null;
          }

          const id = ingredient.id;

          return (
            <NumberInputOptional
              key={id}
              text={<PokemonIngredientIcon dimension="h-7 w-7" id={id}/>}
              min={(minCount && minCount[id]) ?? 0}
              onClickDefault={1}
              value={counter[id]}
              setValue={(value) => onValueChanged(ingredient, value)}
              className="button-bg gap-1 rounded-lg p-1.5"
            />
          );
        })}
      </Flex>
      <Flex direction="row" noFullWidth className="items-center gap-1.5 self-end">
        <Flex direction="row" noFullWidth className="items-center gap-0.5">
          <GenericIconLarger src="/images/generic/ingredient.png" alt={t('Total')}/>
          <div>{toSum(Object.values(counter).filter(isNotNullish))}</div>
        </Flex>
        <button className="button-clickable-bg h-6 w-6 p-1" onClick={onReset}>
          <ArrowPathIcon/>
        </button>
      </Flex>
    </Flex>
  );
};
