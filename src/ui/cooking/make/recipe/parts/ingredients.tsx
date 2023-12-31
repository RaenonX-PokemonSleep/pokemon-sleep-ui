import React from 'react';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {IngredientIcons} from '@/components/shared/meal/ingredients/icons';
import {IngredientIconsFromMeal} from '@/components/shared/meal/ingredients/iconsFromMeal';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';


export const MealMakerRecipeIngredients = ({
  meal,
  ingredientsMissing,
  ingredientSetReady,
}: MealMakerRecipePartsProps) => {
  return (
    <Flex direction="row" className="h-9 items-end gap-0.5">
      <InfoIcon>
        {getMealIngredientCount(meal)}
      </InfoIcon>
      <Flex noFullWidth>
        <IngredientIcons ingredients={ingredientsMissing} getMark={() => 'red'} useTextShadow={false}/>
        <IngredientIconsFromMeal
          meal={meal}
          useTextShadow={false}
          getMark={(ingredient) => ingredientSetReady[ingredient.id] < 1 && 'red'}
        />
      </Flex>
    </Flex>
  );
};
