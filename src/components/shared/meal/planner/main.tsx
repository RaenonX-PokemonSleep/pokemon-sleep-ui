import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {MealPlannerButton} from '@/components/shared/meal/planner/button';
import {mealOfDayIcon} from '@/components/shared/meal/planner/const';
import {MealSelector} from '@/components/shared/meal/selector/main';
import {mealTypeBorderStyle, mealTypeTextStyle} from '@/styles/game/mealType';
import {RecipeLevel} from '@/types/game/cooking';
import {MealMap, MealTypeId} from '@/types/game/meal/main';
import {userCookingMeals, UserCookingTarget} from '@/types/userData/cooking';


type Props = {
  target: UserCookingTarget,
  setTarget: (updated: Partial<UserCookingTarget>) => void,
  recipeLevel: RecipeLevel,
  setRecipeLevel: (updated: Partial<RecipeLevel>) => void,
  mealMap: MealMap,
  mealTypes: MealTypeId[],
};

export const MealPlanner = ({target, setTarget, recipeLevel, setRecipeLevel, mealMap, mealTypes}: Props) => {
  const t = useTranslations('Game');
  const collapsible = useCollapsible();

  return (
    <CollapsibleFull state={collapsible} button={
      <MealPlannerButton target={target} recipeLevel={recipeLevel} mealTypes={mealTypes}/>
    }>
      <Flex className="gap-1.5 p-1">
        {mealTypes.map((mealType) => (
          <Flex key={mealType} className={clsx('gap-1.5 rounded-lg border p-1.5', mealTypeBorderStyle[mealType])}>
            <div className={clsx('px-1 text-left', mealTypeTextStyle[mealType])}>
              {t(`MealType.${mealType}`)}
            </div>
            <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-3">
              {userCookingMeals.map((mealOfDay) => {
                const targetOfType = target[mealType];

                return (
                  <Flex direction="row" key={mealOfDay} className="items-center gap-1.5">
                    <div className="h-8 w-8 shrink-0">
                      {mealOfDayIcon[mealOfDay]}
                    </div>
                    <MealSelector
                      current={targetOfType ? targetOfType[mealOfDay] : undefined}
                      mealMap={mealMap}
                      mealType={mealType}
                      isMealOption={({type}) => type === mealType}
                      onSelect={(meal) => setTarget({[mealType]: {[mealOfDay]: meal ? meal.id : null}})}
                      recipeLevel={recipeLevel}
                      onLevelUpdated={(id, level) => setRecipeLevel({[id]: level})}
                    />
                  </Flex>
                );
              })}
            </Grid>
          </Flex>
        ))}
      </Flex>
    </CollapsibleFull>
  );
};
