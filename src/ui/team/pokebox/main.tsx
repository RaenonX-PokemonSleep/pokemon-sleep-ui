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
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {PokeboxClient} from '@/ui/team/pokebox/client/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


const Pokebox = async () => {
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getIngredientChainMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getMealMap(),
    getFieldMetaMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: PokeboxCommonProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    preloaded: {
      bundle: createUserSettingsBundle(session),
      display: session?.user.preloaded.pokeboxDisplay,
    },
    pokemonMaxLevel,
  };

  return <PokeboxClient {...props}/>;
};

export const PokeboxEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <LoginRequiredPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.Producing',
        'UI.Rating',
      ]}>
        <Pokebox/>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};
