import React from 'react';

import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';


export const MealPreparerInventory = ({filter, setFilter, ingredientMap}: MealPreparerCommonProps) => {
  return (
    <IngredientInventoryInput
      ingredientMap={ingredientMap}
      counter={filter.inventory}
      showIngredient={() => true}
      onValueChanged={({id}, count) => setFilter(({inventory, ...original}) => ({
        ...original,
        inventory: {
          ...inventory,
          [id]: count,
        },
      } satisfies MealPreparerFilter))}
      onReset={() => setFilter(({inventory, ...original}) => ({
        ...original,
        inventory: {},
      } satisfies MealPreparerFilter))}
    />
  );
};
