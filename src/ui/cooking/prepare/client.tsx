'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {defaultCookingPreset} from '@/const/user/cooking';
import {usePossibleMealTypes} from '@/hooks/meal';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {CookingServerDataProps} from '@/ui/cooking/common/type';
import {generateCookingCommonFilter} from '@/ui/cooking/common/utils/main';
import {useMealPreparerInfo} from '@/ui/cooking/prepare/hook/main';
import {MealPreparerInput} from '@/ui/cooking/prepare/input/main';
import {MealPreparerByMealTypes} from '@/ui/cooking/prepare/mealType/main';
import {MealPreparerSummary} from '@/ui/cooking/prepare/summary/main';
import {MealPreparerCommonProps, MealPreparerFilter} from '@/ui/cooking/prepare/type';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish} from '@/utils/type';


export const MealPreparerClient = (props: CookingServerDataProps) => {
  const {mealMap, preloaded} = props;

  const {data: session} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    mealMap,
  });
  const [filter, setFilter] = React.useState<MealPreparerFilter>({
    ...generateCookingCommonFilter(preloaded.cooking),
    mealsWanted: cloneMerge(defaultCookingPreset.mealsWanted, preloaded.cooking?.mealsWanted) ?? {},
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);

  const commonProps: MealPreparerCommonProps = {
    ...props,
    filter,
    setFilter,
    mealTypes,
    calculatedSettings: translatedSettings.calculatedSettings,
    preloaded: preloaded.cooking,
  };

  const info = useMealPreparerInfo({
    ...commonProps,
    meals,
  });

  return (
    <>
      <MealPreparerInput {...commonProps}/>
      <MealPreparerByMealTypes info={info} {...commonProps}/>
      <MealPreparerSummary info={info} inventory={filter.inventory}/>
    </>
  );
};
