import React from 'react';

import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputRow} from '@/components/input/filter/row';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {LevelIcon} from '@/components/shared/icon/lv';
import {defaultExpType} from '@/const/game/xp';
import {textFilterButtonStyle} from '@/styles/input';
import {PokemonExpCalculatorTableRow} from '@/ui/xp/results/row';
import {getLevelUpRequirementsAccumulated, getLevelUpRequirementsOfEachLevel} from '@/ui/xp/results/utils';
import {PokemonExpCalculatorCommonProps, PokemonExpCalculatorInput} from '@/ui/xp/type';
import {getNatureMultiplier} from '@/utils/game/nature';


type Props = PokemonExpCalculatorCommonProps & {
  maxLevel: number,
};

export const PokemonExpCalculatorTable = ({
  pokedexMap,
  xpValueData,
  xpShardConsumption,
  filter,
  setFilter,
}: Props) => {
  const {
    pokemon,
    nature,
    showNonBreakthroughLevel,
  } = filter;

  const t = useTranslations('UI.InPage.PokemonExp');
  const t2 = useTranslations('UI.Common');

  const dimension = 'h-8 w-8';

  const expType = (pokemon ? pokedexMap[pokemon]?.expType : defaultExpType) ?? defaultExpType;
  const levelUpRequirements = getLevelUpRequirementsOfEachLevel({
    ...filter,
    xpData: xpValueData[expType]?.data ?? [],
    xpShardConsumption,
    multiplier: getNatureMultiplier({id: nature, effect: 'exp'}),
  });

  return (
    <Flex className="info-section">
      <InputRow className="justify-end gap-2">
        <ToggleButton
          active={showNonBreakthroughLevel}
          onClick={() => setFilter((original) => ({
            ...original,
            showNonBreakthroughLevel: !original.showNonBreakthroughLevel,
          } satisfies PokemonExpCalculatorInput))}
          className={clsx('group', textFilterButtonStyle)}
        >
          <Flex direction="row" center noFullWidth className="gap-1.5 p-1">
            <div className="h-5 w-5">
              {showNonBreakthroughLevel ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <div>{t('KeyLevel')}</div>
          </Flex>
        </ToggleButton>
      </InputRow>
      <Flex className="overflow-x-auto overflow-y-hidden">
        <table className="border-separate border-spacing-0.5 text-center [&_td]:px-1.5">
          <thead>
            <tr>
              <td>
                <Flex direction="row" center>
                  <LevelIcon dimension={dimension}/>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt="EXP" src="/images/generic/exp.png" dimension={dimension}/>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt={t('NormalCandy')} src="/images/generic/candyWhite.png" dimension={dimension}/>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt={t('HandyCandy')} src="/images/generic/candy.png" dimension={dimension} noInvert/>
                  <div>S</div>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt={t('HandyCandy')} src="/images/generic/candy.png" dimension={dimension} noInvert/>
                  <div>M</div>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt={t('HandyCandy')} src="/images/generic/candy.png" dimension={dimension} noInvert/>
                  <div>L</div>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt={t2('DreamShards')} src="/images/generic/shardWhite.png" dimension={dimension}/>
                </Flex>
              </td>
              <td>
                <Flex direction="row" center>
                  <GenericIcon alt={t2('DreamShards')} src="/images/generic/shardWhite.png" dimension={dimension}/>
                  <span>/</span>
                  <GenericIcon alt="EXP" src="/images/generic/exp.png" dimension={dimension}/>
                </Flex>
              </td>
            </tr>
          </thead>
          <tbody>
            {getLevelUpRequirementsAccumulated(levelUpRequirements).map((data) => (
              <PokemonExpCalculatorTableRow
                key={data.lv}
                input={filter}
                data={data}
              />
            ))}
          </tbody>
        </table>
      </Flex>
    </Flex>
  );
};
