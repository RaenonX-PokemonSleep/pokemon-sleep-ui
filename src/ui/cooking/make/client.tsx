'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {usePossibleMealTypes} from '@/hooks/meal';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {useMealMakerFilter} from '@/ui/cooking/make/hook';
import {MealMakerInputUI} from '@/ui/cooking/make/input/main';
import {MealMakerRecipe} from '@/ui/cooking/make/recipe/main';
import {MealMakerCommonProps, MealMakerFilter} from '@/ui/cooking/make/type';
import {toCookingPreset} from '@/ui/cooking/make/utils';
import {subtractIngredientCount} from '@/utils/game/ingredientCounter';
import {isNotNullish} from '@/utils/type';


export const MealMakerClient = (props: CookingServerDataProps) => {
  const {
    ingredientMap,
    mealMap,
    preloaded,
  } = props;

  const {
    filter,
    setFilter,
    isIncluded,
  } = useMealMakerFilter(props);
  const {actAsync, session, status} = useUserDataActor();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: session.data?.user.preloaded,
    },
    mealMap,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);
  const validMeals = React.useMemo(() => meals.filter(({id}) => isIncluded[id]), [filter]);

  const commonProps: MealMakerCommonProps = {
    filter,
    setFilter,
    meals: validMeals,
    mealTypes,
    ingredientMap,
    calculatedSettings: translatedSettings.calculatedSettings,
    status,
    onCook: async (ingredientsUsed) => {
      setFilter((original) => ({
        ...original,
        inventory: subtractIngredientCount(filter.inventory, ingredientsUsed),
      } satisfies MealMakerFilter));

      if (!actAsync) {
        return;
      }

      await actAsync({
        action: 'upload',
        options: {
          type: 'cooking',
          data: toCookingPreset({preloaded: preloaded.cooking, filter}),
        },
      });
    },
    preloaded: preloaded.cooking,
  };

  return (
    <Flex className="gap-1">
      <MealMakerInputUI {...commonProps}/>
      <AdsUnit/>
      <MealMakerRecipe {...commonProps}/>
      <AdsUnit/>
    </Flex>
  );
};
