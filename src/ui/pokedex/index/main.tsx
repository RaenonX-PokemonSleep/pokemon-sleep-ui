import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getMealMap} from '@/controller/meal';
import {getAllPokemon} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {getSubSkillMap} from '@/controller/subSkill';
import {locales} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokedexClient} from '@/ui/pokedex/index/client';
import {PokedexData, PokedexDataProps, PokemonInfoForPokedex} from '@/ui/pokedex/index/type';
import {getI18nTranslator, isLocale} from '@/utils/i18n';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


const getPokedexData = async (): Promise<PokedexData> => {
  const sleepStyleMap = await getSleepStyleNormalMap();
  const translators = await Promise.all(
    locales
      .filter(isLocale)
      .map((locale) => getI18nTranslator({locale, namespace: 'Game.PokemonName'})),
  );

  return (await getAllPokemon())
    .map((pokemon) => ({
      ...pokemon,
      sleepStyles: sleepStyleMap[pokemon.id] ?? [],
      nameOfAllLocale: translators.map((t) => t(pokemon.id.toString())),
    } satisfies PokemonInfoForPokedex));
};

export const Pokedex = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedex,
    pokemonProducingParamsMap,
    maxLevel,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexData(),
    getPokemonProducingParamsMap(),
    getPokemonMaxLevelByBerry(),
    getBerryDataMap(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getMealMap(),
    getFieldMetaMap(),
  ]);

  const props: PokedexDataProps = {
    pokedex,
    pokemonProducingParamsMap,
    maxLevel,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    preloaded: {
      display: session?.user.preloaded.pokedex,
      bundle: createUserSettingsBundle(session),
    },
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={['Game', 'UI.Common', 'UI.Metadata', 'UI.InPage.Pokedex']}>
        <PokedexClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
