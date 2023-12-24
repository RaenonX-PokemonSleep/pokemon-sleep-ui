import React from 'react';

import {useTranslations} from 'next-intl';

import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {recipeMaxLevel} from '@/const/game/meal';
import {MealCommonProps} from '@/ui/meal/page/type';
import {formatMealStrengthInfo} from '@/utils/game/meal/format';
import {getMealFinalStrength} from '@/utils/game/meal/strength/final';


export const MealExp = ({meal, ingredientMap, translatedSettings}: MealCommonProps) => {
  const t = useTranslations('UI.InPage.Cooking');
  const [level, setLevel] = React.useState(1);

  const mapBonus = translatedSettings.calculatedSettings.bonus.map;
  const info = React.useMemo(() => getMealFinalStrength({
    filler: [],
    level,
    meal,
    ingredientMap,
    mapBonus,
  }), [meal, ingredientMap, level, mapBonus]);

  return (
    <InfoSlider
      title={t('RecipeLevel')}
      value={level}
      setValue={setLevel}
      maxValue={recipeMaxLevel}
    >
      <ColoredEnergyIcon dimension="h-4 w-4" alt={t('Energy')}/>
      <div className="text-sm">
        {formatMealStrengthInfo({info, includeBonusRate: true})}
      </div>
    </InfoSlider>
  );
};
