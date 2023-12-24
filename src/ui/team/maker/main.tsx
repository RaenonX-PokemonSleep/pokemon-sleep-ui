import React from 'react';

import {getServerSession} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap} from '@/controller/berry';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap} from '@/controller/mapMeta';
import {getMealMap} from '@/controller/meal';
import {getUserPokeboxSorted} from '@/controller/pokebox/main';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getSnorlaxData} from '@/controller/snorlax';
import {getSubSkillMap} from '@/controller/subSkill';
import {Locale} from '@/types/next/locale';
import {DefaultPageProps} from '@/types/next/page/common';
import {PremiumOnlyPageLayout} from '@/ui/base/layout/premiumOnly/main';
import {TeamMakerClient} from '@/ui/team/maker/client';
import {TeamMakerDataProps} from '@/ui/team/maker/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type TeamMakerProps = {
  locale: Locale,
};

const TeamMaker = async ({locale}: TeamMakerProps) => {
  const session = await getServerSession(authOptions);

  const [
    pokeboxList,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    snorlaxData,
  ] = await Promise.all([
    getUserPokeboxSorted(session?.user.id),
    getPokedexMap(),
    getPokemonProducingParamsMap(),
    getIngredientChainMap(),
    getBerryDataMap(),
    getIngredientMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getMealMap(),
    getFieldMetaMap(),
    getSnorlaxData(),
  ]);

  const props: TeamMakerDataProps = {
    pokeboxList,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    mapMeta,
    snorlaxData,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.InPage.Cooking',
      'UI.InPage.Pokedex',
      'UI.InPage.Team',
      'UI.Metadata',
      'UI.Producing',
      'UI.Stamina',
    ]}>
      <TeamMakerClient {...props}/>
    </I18nProvider>
  );
};

export const TeamMakerEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <PremiumOnlyPageLayout locale={locale}>
      <AdsUnit/>
      <TeamMaker locale={locale}/>
      <AdsUnit/>
    </PremiumOnlyPageLayout>
  );
};
