'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {isFilterIncludingSome} from '@/components/input/filter/utils/check';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {PokemonInfoWithSortingPayload} from '@/components/shared/pokemon/sorter/type';
import {useSortingWorker} from '@/components/shared/pokemon/sorter/worker/hook';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {usePokedexFilter} from '@/ui/pokedex/index/filter';
import {PokedexInput} from '@/ui/pokedex/index/input/main';
import {PokedexLink} from '@/ui/pokedex/index/link';
import {PokedexDataProps} from '@/ui/pokedex/index/type';
import {toCalculateAllIngredientPossibilities} from '@/ui/pokedex/index/utils';
import {getPossibleIngredientsFromChain} from '@/utils/game/ingredientChain';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProducingParams, getProducingRateIndividualParams} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


export const PokedexClient = (props: PokedexDataProps) => {
  const {
    pokedex,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientChainMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    preloaded,
  } = props;

  const {data: session} = useSession();
  const [loading, setLoading] = React.useState(false);
  const {filter, setFilter, isIncluded} = usePokedexFilter({
    data: pokedex,
    preloadedDisplay: preloaded.display,
    ...props,
  });

  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded.bundle,
      client: session?.user.preloaded,
    },
    mealMap,
  });

  const sortingDeps = [filter, translatedSettings];

  const allInfoWithSortingPayload = React.useMemo(() => pokedex.flatMap((
    pokemon,
  ): PokemonInfoWithSortingPayload<null>[] => {
    const commonOpts: Omit<PokemonInfoWithSortingPayload<null>, 'ingredients'> = {
      pokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokemon.id,
        pokemonProducingParamsMap,
      }),
      dateAdded: null,
      extra: null,
      ...translatedSettings,
      ...getProducingRateIndividualParams({
        input: filter,
        pokemon,
        subSkillMap,
      }),
    };
    const chain = ingredientChainMap[pokemon.ingredientChain];

    if (!toCalculateAllIngredientPossibilities(filter)) {
      return [{
        ...commonOpts,
        // Count of 0 to avoid accidental inclusion in the calculation
        ingredients: getPossibleIngredientsFromChain({chain, count: 0}),
      }];
    }

    return [...generatePossibleIngredientProductions({
      level: filter.level,
      chain,
    })]
      .map((ingredients) => ({...commonOpts, ingredients}));
  }), sortingDeps);

  const sortedFilteredData = useSortingWorker({
    // Filtering unwanted data here as `<PokedexResultCount/>` checks the following for result count:
    // - Result: length of `sortedData`
    // - Total: length of `allInfoWithSortingPayload`
    data: allInfoWithSortingPayload
      .map((single) => {
        const {ingredients, pokemon} = single;

        if (!isIncluded[pokemon.id]) {
          return null;
        }

        if (!isFilterIncludingSome({
          filter,
          filterKey: 'ingredient',
          ids: ingredients.map(({id}) => id)})
        ) {
          return null;
        }

        return single;
      })
      .filter(isNotNullish),
    sort: filter.sort,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    snorlaxFavorite: filter.snorlaxFavorite,
    triggerDeps: sortingDeps,
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokedex',
      data: {
        sort: filter.sort,
        display: filter.display,
        mainSkill: filter.mainSkill,
        level: filter.level,
        subSkill: filter.subSkill,
        nature: filter.nature,
        version: filter.version,
      },
    },
    triggerDeps: [filter.sort, filter.display, filter.mainSkill, filter.level],
  });

  return (
    <>
      <AdsUnit/>
      <PokedexInput filter={filter} setFilter={setFilter} {...props}/>
      <CompletionResultUI
        completed={sortedFilteredData.length}
        total={allInfoWithSortingPayload.length}
        className="self-end"
      />
      <LazyLoad loading={loading}>
        <Grid className={clsx(
          filter.display === 'mainSkill' ?
            // Main skill is the only content with long words that's unable to truncate,
            // therefore the column breakpoints should be specialized
            // to avoid making all the other display type having a lot of spaces
            'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5' :
            'grid-cols-2 gap-1.5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 2xl:grid-cols-6',
        )}>
          {sortedFilteredData.map(({source}) => {
            const ingredientIds = source.ingredients.map(({id}) => id);
            const pokemonId = source.pokemon.id;
            const key = `${pokemonId}-${ingredientIds.join('-')}`;

            // --- Any filtering condition should **NOT** go here as it makes the result count incorrect
            // Filter it at the creation of `sortedFilteredData` instead (`useSortingWorker.data`)

            return (
              <PokedexLink
                key={key}
                pokemon={source.pokemon}
                pokemonProducingParams={getPokemonProducingParams({
                  pokemonId,
                  pokemonProducingParamsMap,
                })}
                display={filter.display}
                level={filter.level}
                subSkill={filter.subSkill}
                nature={filter.nature}
                snorlaxFavorite={filter.snorlaxFavorite}
                ingredients={source.ingredients}
                {...translatedSettings}
                {...props}
              />
            );
          })}
        </Grid>
      </LazyLoad>
      <AdsUnit/>
    </>
  );
};
