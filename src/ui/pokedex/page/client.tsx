'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {PokemonBranches} from '@/ui/pokedex/page/branch/main';
import {PokemonEvolution} from '@/ui/pokedex/page/evolution/main';
import {PokemonMeta} from '@/ui/pokedex/page/meta/main';
import {PokemonProduction} from '@/ui/pokedex/page/production/main';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle/main';
import {PokemonDataCommonProps, PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonClient = (props: PokemonDataProps) => {
  const {
    pokemonBranches,
    mealMap,
    preloaded,
  } = props;

  const pokemonLinkPopup = usePokemonLinkPopup();
  const {data} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });

  const commonProps: PokemonDataCommonProps = {
    ...props,
    translatedSettings,
  };

  return (
    <>
      <PokemonLinkPopup {...pokemonLinkPopup}/>
      <PokemonMeta {...props}/>
      <AdsUnit/>
      <PokemonProduction session={data} {...commonProps}/>
      <AdsUnit/>
      <PokemonEvolution {...pokemonLinkPopup} {...props}/>
      {pokemonBranches && <AdsUnit/>}
      <PokemonBranches {...pokemonLinkPopup} {...props}/>
      <AdsUnit/>
      <PokemonSleepStyles {...commonProps}/>
    </>
  );
};
