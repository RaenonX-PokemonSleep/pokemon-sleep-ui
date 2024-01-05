import React from 'react';

import {getServerSession} from 'next-auth';

import {PokedexPageParams} from '@/app/[locale]/pokedex/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {getBerryData} from '@/controller/berry';
import {getEventDrowsyPowerMultiplierData} from '@/controller/event/drowsyPowerMultiplier';
import {getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getMealMap} from '@/controller/meal';
import {getAssociatedPokemonBranchData} from '@/controller/pokemon/branch';
import {getPokedexMap, getSinglePokemonInfo} from '@/controller/pokemon/info';
import {getSinglePokemonProducingParams} from '@/controller/pokemon/producing';
import {getSleepStyleNormalList} from '@/controller/sleepStyle';
import {getSleepStyleSpecialListOfPokemon} from '@/controller/sleepStyleSpecial';
import {getSnorlaxDataMap} from '@/controller/snorlax';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {PokemonClient} from '@/ui/pokedex/page/client';
import {PokemonDataProps} from '@/ui/pokedex/page/type';
import {getRelatedPokemonIds} from '@/utils/game/pokemon/branch';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type Props = {
  params: PokedexPageParams,
};

export const Pokemon = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const pokemon = await getSinglePokemonInfo(idNumber);

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  const pokemonBranch = await getAssociatedPokemonBranchData(pokemon.id);

  const [
    session,
    pokedex,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    snorlaxDataMap,
    mealMap,
    eventDrowsyPowerMultiplierData,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokedexMap(getRelatedPokemonIds({pokemon, branchData: pokemonBranch})),
    getSinglePokemonProducingParams(pokemon.id),
    getIngredientChainMap(),
    getSleepStyleNormalList(idNumber),
    getSleepStyleSpecialListOfPokemon(idNumber),
    getBerryData(pokemon.berry.id),
    getIngredientMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getSnorlaxDataMap(),
    getMealMap(),
    getEventDrowsyPowerMultiplierData(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: PokemonDataProps = {
    pokedex,
    pokemon,
    pokemonBranch,
    pokemonProducingParams,
    ingredientChainMap,
    sleepStyles,
    sleepStylesSpecial,
    berryData,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    snorlaxDataMap,
    mealMap,
    eventDrowsyPowerMultiplierData,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex center className="gap-2">
        <AdsUnit/>
        <I18nProvider locale={locale} namespaces={[
          'Game',
          'UI.Common',
          'UI.Evolution',
          'UI.InPage.Pokedex',
          'UI.InPage.Team',
          'UI.Metadata',
          'UI.SleepStyle',
        ]}>
          <PokemonClient {...props}/>
        </I18nProvider>
        <AdsUnit/>
      </Flex>
    </PublicPageLayout>
  );
};
