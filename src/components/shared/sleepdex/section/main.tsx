import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {ProgressBar} from '@/components/progressBar';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {useSleepdexSection} from '@/components/shared/sleepdex/section/hook';
import {SleepdexPokemonInSection} from '@/components/shared/sleepdex/section/pokemon';
import {SleepdexSectionProps} from '@/components/shared/sleepdex/section/type';


export const SleepdexSection = (props: SleepdexSectionProps) => {
  const {title} = props;

  const collapsible = useCollapsible(true);
  const {
    availableSleepStyles,
    totalSleepStyles,
    unlockedSleepStyles,
  } = useSleepdexSection(props);

  return (
    <>
      <AdsUnit/>
      <CollapsibleFull state={collapsible} button={
        <Flex center className="gap-1 p-1 text-lg">
          <Flex direction="row" center className="gap-3">
            {title}
            <CompletionResultUI completed={unlockedSleepStyles} total={totalSleepStyles}/>
          </Flex>
          <ProgressBar percent={unlockedSleepStyles / totalSleepStyles * 100}/>
        </Flex>
      }>
        <Grid className={clsx(
          'grid-cols-2 gap-2 p-2 xs:grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7',
        )}>
          {availableSleepStyles.map(({pokemon, sleepStyles}) => (
            <SleepdexPokemonInSection key={pokemon.id} pokemon={pokemon} sleepStyles={sleepStyles} {...props}/>
          ))}
        </Grid>
      </CollapsibleFull>
    </>
  );
};
