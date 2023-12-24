import React from 'react';

import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import {StarIcon} from '@heroicons/react/24/solid';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {SleepStyleUnlockRequirement} from '@/components/shared/sleepStyle/components/requirement';
import {useSleepStyleName} from '@/hooks/sleepdex/name';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {getToggleButtonClass} from '@/styles/input';
import {SleepStyleCommon} from '@/types/game/sleepStyle';
import {PokemonSleepStyleRewardCell} from '@/ui/pokedex/page/sleepStyle/reward';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';
import {getPokemonSleepStyleId} from '@/utils/game/pokemon';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props<TSleepStyle extends SleepStyleCommon> = PokemonSleepStyleProps & {
  sleepStyle: TSleepStyle,
};

export const PokemonSingleSleepStyle = <TSleepStyle extends SleepStyleCommon>({
  sleepStyle,
  ...props
}: Props<TSleepStyle>) => {
  const {
    pokemon,
    pokemonBranch,
    sleepdex,
    setSleepdex,
  } = props;
  const {
    style,
    spo,
    rarity,
    rewards,
  } = sleepStyle;

  const pokemonId = pokemon.id;

  const t = useTranslations('UI.Common');
  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});
  const pokemonSleepStyleId = getPokemonSleepStyleId({
    pokemonId,
    branch: pokemonBranch,
  });
  const sleepStyleName = useSleepStyleName({
    pokemonId: pokemonSleepStyleId,
    sleepStyleId: sleepStyle.style,
  });

  return (
    <Flex direction="row" center className="gap-1.5 p-2.5" noFullWidth>
      <button className={clsx(
        'z-10 h-9 w-9 shrink-0 rounded-lg p-1.5',
        getToggleButtonClass(isInSleepdex({sleepdex, pokemonId, styleId: style}) ?? false),
      )} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSleepdex({pokemonId, styleId: style});
      }}>
        <BookmarkIcon/>
      </button>
      <Flex className="gap-1">
        <Flex direction="row" center className="items-center gap-1">
          <Flex direction="row" noFullWidth className="items-center gap-0.5">
            <StarIcon className="h-5 w-5"/>
            <div>{rarity}</div>
          </Flex>
          <Flex direction="row" noFullWidth className="items-end gap-1">
            <div>{sleepStyleName}</div>
            <small className="text-slate-600 dark:text-slate-400">#{style}</small>
          </Flex>
        </Flex>
        <SleepStyleUnlockRequirement spo={spo} {...props}/>
        <Flex direction="row" center className="gap-1.5">
          <PokemonSleepStyleRewardCell
            iconSrc="/images/generic/research.png"
            iconAlt={t('Exp')}
            value={rewards.exp}
          />
          <PokemonSleepStyleRewardCell
            iconSrc="/images/generic/shard.png"
            iconAlt={t('DreamShards')}
            value={rewards.shards}
          />
          <PokemonSleepStyleRewardCell
            iconSrc="/images/generic/candy.png"
            iconAlt={t('Candy')}
            value={rewards.candy}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
