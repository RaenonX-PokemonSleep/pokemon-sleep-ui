import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import potCapacity from '@/data/potCapacity.json';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {Meal} from '@/types/game/meal/main';
import {PotInfoDataProps, PotInfoFilter} from '@/ui/info/pot/type';
import {PotRecipeUnlockSection} from '@/ui/info/pot/unlockSection';
import {getMealIngredientCount} from '@/utils/game/meal/count';


type Props = Omit<PotInfoDataProps, 'meals'> & {
  filter: PotInfoFilter,
  validMeals: Meal[],
};

export const PotRecipeUnlockTable = ({mealMap, filter, validMeals, ...props}: Props) => {
  const {preloaded} = props;
  const {capacity, showEmpty} = filter;

  const {data: session} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    mealMap,
  });

  const sortedMeals = validMeals.sort((a, b) => {
    const diff = getMealIngredientCount(a) - getMealIngredientCount(b);

    if (diff !== 0) {
      return diff;
    }

    return a.id - b.id;
  });

  let mealCursorIdx = 0;
  let cumulativeCost = 0;

  return (
    <Flex center className="gap-1.5">
      {potCapacity
        .sort((a, b) => a.level - b.level)
        .map((potInfo) => {
          const unlockedMeals: Meal[] = [];
          let currentMeal: Meal | undefined = sortedMeals[mealCursorIdx];

          while (currentMeal && getMealIngredientCount(currentMeal) <= potInfo.capacity) {
            unlockedMeals.push(currentMeal);

            mealCursorIdx++;
            currentMeal = sortedMeals[mealCursorIdx];
          }

          if (!capacity || potInfo.capacity > capacity) {
            cumulativeCost += potInfo.cost;
          }

          if (!showEmpty && capacity && (!unlockedMeals.length || potInfo.capacity <= capacity)) {
            return null;
          }

          return (
            <PotRecipeUnlockSection
              key={potInfo.capacity}
              filter={filter}
              cumulativeCost={cumulativeCost}
              potInfo={potInfo}
              unlockedMeals={unlockedMeals}
              unlockedRecipes={mealCursorIdx}
              calculatedSettings={translatedSettings.calculatedSettings}
              {...props}
            />
          );
        })}
    </Flex>
  );
};
