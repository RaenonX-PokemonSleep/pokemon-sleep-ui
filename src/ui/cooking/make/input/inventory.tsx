import React from 'react';

import {isFilterConditionActive} from '@/components/input/filter/utils/check';
import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealMakerCommonProps, MealMakerFilter} from '@/ui/cooking/make/type';


export const MealMakerInputInventory = ({filter, setFilter, ingredientMap}: MealMakerCommonProps) => {
  return (
    <IngredientInventoryInput
      ingredientMap={ingredientMap}
      counter={filter.inventory}
      showIngredient={(ingredient) => !(
        isFilterConditionActive({filter, filterKey: 'ingredient'}) &&
        !filter.ingredient[ingredient.id]
      )}
      onValueChanged={({id}, count) => setFilter((original) => ({
        ...original,
        inventory: {
          ...original.inventory,
          [id]: count,
        },
      } satisfies MealMakerFilter))}
      onReset={() => setFilter(({inventory, ...original}) => ({
        ...original,
        inventory: {},
      } satisfies MealMakerFilter))}
    />
  );
};
