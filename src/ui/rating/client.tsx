'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {RatingBasisSelection} from '@/components/shared/pokemon/rating/basis/selection/main';
import {RatingFriendshipLevel} from '@/components/shared/pokemon/rating/friendship/main';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {specialtyIdMap} from '@/const/game/pokemon';
import {ratingBasisSpecialty} from '@/const/game/rating';
import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {RatingOnDeskState, RatingRequest} from '@/types/game/pokemon/rating/request';
import {RatingDataProps, RatingServerDataProps} from '@/ui/rating/type';
import {toRatingRequest} from '@/ui/rating/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';
import {isNotNullish} from '@/utils/type';


export const RatingClient = (props: RatingServerDataProps) => {
  const {
    pokedexMap,
    pokemonProducingParamsMap,
    mapMeta,
    preloaded,
  } = props;

  const t = useTranslations('UI.InPage.Rating');
  const [request, setRequest] = React.useState<RatingRequest>();
  const {data: session} = useSession();
  const bundle = useUserSettingsBundle({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
  });
  const advancedOptionsCollapsible = useCollapsible();

  const resultRef = React.useRef<HTMLDivElement>(null);

  const pokemonList = Object.values(pokedexMap).filter(isNotNullish);
  const data: RatingDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    ...props,
  };

  const scrollToResult = () => resultRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup, opts) => {
        const {origin} = opts;

        if (origin === 'pokebox') {
          setRequest(toRatingRequest({setup: {...setup, bundle}}));
          scrollToResult();
        } else if (origin === 'pokedex' && request) {
          // This is for resetting the result layout
          setRequest(toRatingRequest({
            setup: {...setup, bundle},
            timestamp: request.timestamp,
          }));
        }
      }}
      onRun={(setup: RatingOnDeskState) => {
        scrollToResult();
        setRequest(toRatingRequest({setup: {...setup, bundle}}));
      }}
      toState={(onDeskState): RatingOnDeskState => ({
        ...onDeskState,
        snorlaxFavorite: {},
        basis: getDefaultRatingBasis(onDeskState.pokemon.specialty),
        friendshipLevel: 0,
      })}
      renderAdditional={(onDesk, setOnDesk) => (
        <Flex className="gap-1.5">
          <RatingBasisSelection
            current={onDesk.basis}
            onSelect={(basis) => setOnDesk((original) => ({
              ...original,
              basis,
            }))}
          />
          <AnimatedCollapse show={ratingBasisSpecialty[onDesk.basis].includes(specialtyIdMap.ingredient)}>
            <ReactMarkdown className="info-highlight-inner p-2 text-left">
              {t('Message.RatingBasisIsIngredientRelated')}
            </ReactMarkdown>
          </AnimatedCollapse>
          <CollapsibleFull state={advancedOptionsCollapsible} button={t('AdvancedOptions')}>
            <Flex className="gap-1.5">
              <SnorlaxFavoriteInput
                pokemonList={pokemonList}
                mapMeta={mapMeta}
                filter={onDesk}
                setFilter={setOnDesk}
                filterKey="snorlaxFavorite"
              />
              <RatingFriendshipLevel
                current={onDesk.friendshipLevel}
                onUpdated={(friendshipLevel) => setOnDesk((original) => ({
                  ...original,
                  friendshipLevel,
                }))}
              />
            </Flex>
          </CollapsibleFull>
        </Flex>
      )}
      renderResult={({pokemon}) => (
        <RatingResult
          ref={resultRef}
          request={request}
          pokemon={pokemon}
          pokemonProducingParams={getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap,
          })}
          {...data}
        />
      )}
    />
  );
};
