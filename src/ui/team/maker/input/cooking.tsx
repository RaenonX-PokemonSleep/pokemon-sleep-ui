import React from 'react';

import {IngredientInventoryInput} from '@/components/shared/input/ingredient/inventory';
import {MealTypeInput} from '@/components/shared/input/mealType';
import {MealPlanner} from '@/components/shared/meal/planner/main';
import {usePossibleMealTypes} from '@/hooks/meal';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';
import {TeamMakerInput} from '@/ui/team/maker/type/input';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export const TeamMakerInputCooking = ({
  input,
  setInput,
  ingredientMap,
  mealMap,
}: TeamMakerInputCommonProps) => {
  const {
    target,
    recipeLevel,
    ingredientCount,
  } = input;

  const mealTypes = usePossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <>
      <MealTypeInput
        mealTypes={mealTypes}
        isActive={(mealType) => mealType === input.mealType}
        onClick={(mealType) => setInput((original) => ({...original, mealType}))}
      />
      <MealPlanner
        target={target}
        setTarget={(updated) => setInput(({target, ...original}) => ({
          ...original,
          target: cloneMerge(target, updated),
        }))}
        recipeLevel={recipeLevel}
        setRecipeLevel={(updated) => setInput(({recipeLevel, ...original}) => ({
          ...original,
          recipeLevel: cloneMerge(recipeLevel, updated),
        }))}
        mealMap={mealMap}
        mealTypes={mealTypes}
      />
      <IngredientInventoryInput
        ingredientMap={ingredientMap}
        counter={ingredientCount}
        showIngredient={() => true}
        onValueChanged={({id}, count) => setInput(({ingredientCount, ...original}) => ({
          ...original,
          ingredientCount: {
            ...ingredientCount,
            [id]: count,
          },
        } satisfies TeamMakerInput))}
        onReset={() => setInput(({ingredientCount, ...original}) => ({
          ...original,
          ingredientCount: {},
        } satisfies TeamMakerInput))}
      />
    </>
  );
};
