import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextLink} from '@/components/shared/common/link/main';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFilterTitle} from '@/components/shared/pokemon/filter/title';
import {PokemonIngredientIcon} from '@/components/shared/pokemon/ingredients/icon';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {AnalysisStatsGroupedUI} from '@/ui/analysis/page/result/group';
import {AnalysisStatsLayout} from '@/ui/analysis/page/stats/layout';
import {AnalysisStatsUiProps} from '@/ui/analysis/page/stats/type';
import {getEffectiveIngredientLevels} from '@/utils/game/producing/ingredient/level';


export const AnalysisStatsOfPokemonMeta = ({pokemon, stats, level}: AnalysisStatsUiProps) => {
  const {
    type,
    specialty,
    sleepType,
    berry,
    skill,
  } = pokemon;
  const t = useTranslations('Game');

  return (
    <AnalysisStatsLayout>
      <AnalysisStatsGroupedUI
        stats={stats.pokemon.type}
        title={<PokemonFilterTitle type="pokemonType"/>}
      >
        <PokemonTypeIcon type={type} dimension="h-10 w-10"/>
      </AnalysisStatsGroupedUI>
      {
        specialty &&
        <AnalysisStatsGroupedUI
          stats={stats.pokemon.specialty}
          title={<PokemonFilterTitle type="specialty"/>}
        >
          <div className="text-2xl">
            <PokemonSpecialty dimension="h-8 w-8" specialty={specialty}/>
          </div>
        </AnalysisStatsGroupedUI>
      }
      <AnalysisStatsGroupedUI stats={stats.pokemon.sleepType} title={<PokemonFilterTitle type="sleepType"/>}>
        <div className="text-2xl">
          <PokemonSleepType dimension="h-8 w-8" sleepType={sleepType}/>
        </div>
      </AnalysisStatsGroupedUI>
      {getEffectiveIngredientLevels(level).map((ingredientLevel) => (
        stats.pokemon.ingredient[ingredientLevel].map((stats, idx) => (
          stats.linked.length &&
          <AnalysisStatsGroupedUI
            key={`Ingredient-${ingredientLevel}-${idx}`}
            stats={stats}
            threshold={{superRare: 9, rare: 7, ordinary: 3.5}}
            title={
              <Flex direction="row" center className="gap-1">
                <PokemonFilterTitle type="ingredient"/>
                <div>Lv {ingredientLevel} #{idx + 1}</div>
              </Flex>
            }
          >
            {/* All linked got the same ingredient ID, so `stats.linked[0]` is OK here */}
            <PokemonIngredientIcon
              key={`${ingredientLevel}-${stats.linked[0].data.id}`}
              dimension="h-12 w-12"
              id={stats.linked[0].data.id}
            />
          </AnalysisStatsGroupedUI>
        ))
      ))}
      <AnalysisStatsGroupedUI stats={stats.pokemon.berry} title={<PokemonFilterTitle type="berry"/>}>
        <PokemonBerryIcon dimension="h-12 w-12" id={berry.id}/>
      </AnalysisStatsGroupedUI>
      <AnalysisStatsGroupedUI stats={stats.pokemon.mainSkill} title={<PokemonFilterTitle type="mainSkill"/>}>
        <Flex center className="h-12 text-2xl">
          <NextLink href={`/info/mainskill/${skill}`} className="button-clickable p-1 px-1.5">
            {t(`MainSkill.Name.${skill}`)}
          </NextLink>
        </Flex>
      </AnalysisStatsGroupedUI>
    </AnalysisStatsLayout>
  );
};
