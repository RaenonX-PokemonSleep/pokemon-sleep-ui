'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {useCalculationWorker} from '@/ui/analysis/page/calc/hook';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';
import {useAnalysisFilter} from '@/ui/analysis/page/hook';
import {AnalysisPageInput} from '@/ui/analysis/page/input/main';
import {AnalysisMeta} from '@/ui/analysis/page/meta';
import {AnalysisStatsUI} from '@/ui/analysis/page/stats/main';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {getPokedexWithField} from '@/utils/game/pokemon';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredient/level';


export const AnalysisPageClient = (props: AnalysisPageCommonProps) => {
  const {
    pokemonList,
    pokemon,
    sleepStyleMap,
    mealMap,
    preloaded,
  } = props;

  const [stats, setStats] = React.useState<AnalysisStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const {filter, setFilter, isIncluded} = useAnalysisFilter({
    data: getPokedexWithField({pokemonList, sleepStyleMap}),
    currentPokemon: pokemon,
    ...props,
  });
  const ingredients = React.useMemo(() => getEffectiveIngredientLevels(filter.level)
    .map((level) => filter.ingredients[level]), [filter]);

  const {data: session} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    mealMap,
  });

  useCalculationWorker({
    pokemonToAnalyze: pokemonList.filter(({id}) => isIncluded[id]),
    setStats,
    setLoading,
    calculateDeps: [filter, translatedSettings],
    ...translatedSettings,
    ...props,
    ...filter,
    ingredients,
  });

  return (
    <Flex className="gap-1.5">
      <AdsUnit/>
      <AnalysisMeta {...props}/>
      <AdsUnit/>
      <AnalysisPageInput
        filter={filter}
        setFilter={setFilter}
        session={session}
        {...props}
      />
      <AnalysisStatsUI stats={stats} loading={loading} level={filter.level} {...props}/>
      <AdsUnit/>
    </Flex>
  );
};
