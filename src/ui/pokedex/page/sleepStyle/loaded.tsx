import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {NumberInputRequired} from '@/components/shared/input/number/required/main';
import {SleepdexMap} from '@/types/game/sleepdex';
import {PokemonSleepStylesIncenseOnly} from '@/ui/pokedex/page/sleepStyle/incenseOnly';
import {PokemonSleepStylesOfMap} from '@/ui/pokedex/page/sleepStyle/map';
import {PokemonDataCommonProps} from '@/ui/pokedex/page/type';
import {toUnique} from '@/utils/array';
import {getCurrentDrowsyPowerMultiplier} from '@/utils/game/event/drowsyPowerMultiplier';
import {isInSleepdex} from '@/utils/game/sleepdex';


type Props = PokemonDataCommonProps & {
  initialSleepdex: SleepdexMap,
};

export const PokemonSleepStylesLoaded = ({
  pokemon,
  pokemonBranches,
  sleepStyles,
  sleepStylesSpecial,
  snorlaxDataMap,
  eventDrowsyPowerMultipliers,
  translatedSettings,
  initialSleepdex,
}: Props) => {
  const [sleepdex, setSleepdex] = React.useState(initialSleepdex);
  const [drowsyPowerMultiplier, setDrowsyPowerMultiplier] = React.useState(
    getCurrentDrowsyPowerMultiplier(eventDrowsyPowerMultipliers),
  );
  const t = useTranslations('UI.SleepStyle');

  const {
    availableSleepStyles,
    unlockedSleepStyles,
  } = React.useMemo(() => {
    const availableSleepStyles = toUnique([
      ...sleepStyles.flatMap((sleepStyleNormal) => (
        sleepStyleNormal.styles.map((sleepStyle) => (
          sleepStyle.style
        ))
      )),
      ...sleepStylesSpecial.map((sleepStyleSpecial) => (
        sleepStyleSpecial.style
      )),
    ]);

    const unlockedSleepStyles = availableSleepStyles.reduce<number>((unlockedSleepStyles, current) => {
      if (isInSleepdex({sleepdex, pokemonId: pokemon.id, styleId: current})) {
        return unlockedSleepStyles + 1;
      }

      return unlockedSleepStyles;
    }, 0);

    return {availableSleepStyles, unlockedSleepStyles};
  }, [sleepdex]);

  if (!sleepStyles.length) {
    return null;
  }

  return (
    <Flex className="info-section">
      <NumberInputRequired
        text={t('DrowsyPowerMultiplier')}
        value={drowsyPowerMultiplier}
        setValue={setDrowsyPowerMultiplier}
        className="self-end"
      />
      <HorizontalSplitter/>
      <Flex center wrap className="gap-1.5 md:flex-row">
        {sleepStyles.map((sleepStyleOfMap) => (
          <PokemonSleepStylesOfMap
            key={sleepStyleOfMap.mapId}
            sleepdex={sleepdex}
            setSleepdex={setSleepdex}
            drowsyPowerMultiplier={drowsyPowerMultiplier}
            pokemon={pokemon}
            pokemonBranch={pokemonBranches}
            calculatedSettings={translatedSettings.calculatedSettings}
            snorlaxData={snorlaxDataMap[sleepStyleOfMap.mapId]}
            sleepStyleOfMap={sleepStyleOfMap}
          />
        ))}
        <PokemonSleepStylesIncenseOnly
          pokemon={pokemon}
          pokemonBranch={pokemonBranches}
          sleepdex={sleepdex}
          setSleepdex={setSleepdex}
          drowsyPowerMultiplier={drowsyPowerMultiplier}
          sleepStylesIncenseOnly={sleepStylesSpecial}
        />
        <Flex direction="row" center className="justify-end">
          <CompletionResultUI
            completed={unlockedSleepStyles}
            total={availableSleepStyles.length}
          />
        </Flex>
        <Flex className="info-highlight p-1">
          {t('Message.UnlockRankDiffers')}
        </Flex>
      </Flex>
    </Flex>
  );
};
