import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';
import {getSpoRequirement} from '@/utils/game/sleepStyle';
import {getSnorlaxRankAtEnergy, sortBySnorlaxRankAsc} from '@/utils/game/snorlax';
import {formatInt} from '@/utils/number/format';
import {isNotNullish} from '@/utils/type';


type Props = PokemonSleepStyleProps & {
  spo: number,
  drowsyPowerMultiplier: number,
  dimension?: Dimension,
};

export const SleepStyleUnlockRequirement = ({
  snorlaxData,
  sleepStyleUnlockRank,
  spo,
  drowsyPowerMultiplier,
  dimension,
}: Props) => {
  const t = useTranslations('UI.SleepStyle');

  const {
    minimumRank,
    drowsyScore,
  } = React.useMemo(() => {
    const {drowsyScore, snorlaxStrength} = getSpoRequirement({
      spo,
      drowsyPowerMultiplier,
    });

    const rankRequirement = [
      snorlaxData ?
        getSnorlaxRankAtEnergy({energy: snorlaxStrength, data: snorlaxData.data})?.rank :
        null,
    ];
    if (sleepStyleUnlockRank) {
      rankRequirement.push(sleepStyleUnlockRank);
    }

    const minimumRank = rankRequirement.filter(isNotNullish).sort(sortBySnorlaxRankAsc).at(-1);

    return {
      minimumRank,
      drowsyScore,
    };
  }, [snorlaxData, sleepStyleUnlockRank, spo, drowsyPowerMultiplier]);

  return (
    <Flex direction="row" center noFullWidth className="gap-2">
      {minimumRank && <SnorlaxRankUI rank={minimumRank}/>}
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className={clsx('relative', dimension ?? 'h-6 w-6')}>
          <NextImage
            src="/images/generic/snorlax.png"
            alt={t('DrowsyPowerRequired')}
            sizes={imageSmallIconSizes}
          />
        </div>
        <div>{formatInt(drowsyScore)}</div>
      </Flex>
    </Flex>
  );
};
