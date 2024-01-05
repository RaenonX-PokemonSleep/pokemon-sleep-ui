import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex/common';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {pokemonVanillaPresetModeI18nId} from '@/components/shared/pokemon/predefined/vanillaPreset/const';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {specialtyIdMap} from '@/const/game/pokemon';
import {PokemonVanillaPreset, pokemonVanillaPresetMode} from '@/types/game/pokemon/params';
import {specialtyType} from '@/types/game/pokemon/specialty';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props = FilterWithUpdaterProps<PokemonVanillaPreset> & {
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
  className?: string,
};

export const PokemonVanillaPresetInput = ({
  subSkillMap,
  pokemonMaxLevel,
  filter,
  setFilter,
  className,
}: Props) => {
  const t = useTranslations('UI.Producing.VanillaPreset');

  const {mode} = filter;

  return (
    <Flex className={className}>
      <FilterTextInput
        title={
          <Flex center>
            {t('Mode')}
          </Flex>
        }
        ids={[...pokemonVanillaPresetMode]}
        idToText={(mode) => t(pokemonVanillaPresetModeI18nId[mode])}
        isActive={(mode) => filter.mode === mode}
        onClick={(mode) => setFilter((original) => ({
          ...original,
          mode,
        } satisfies PokemonVanillaPreset))}
      />
      <AnimatedCollapse show={mode === 'shared'}>
        <Flex className={className}>
          <InputRowWithTitle title={
            <Flex center>
              {t('Shared')}
            </Flex>
          }>
            <PokemonIndividualParamsPicker
              filter={filter.shared}
              setFilter={(getUpdated) => setFilter(({shared, ...original}) => ({
                ...original,
                shared: getUpdated(shared),
              } satisfies PokemonVanillaPreset))}
              isPremium
              subSkillMap={subSkillMap}
              maxLevel={pokemonMaxLevel}
              noSameLine={false}
            />
          </InputRowWithTitle>
        </Flex>
      </AnimatedCollapse>
      <AnimatedCollapse show={mode === 'bySpecialty'}>
        <Flex className={className}>
          {specialtyType.map((specialty) => (
            <InputRowWithTitle key={specialty} title={
              <Flex center>
                <PokemonSpecialty specialty={specialtyIdMap[specialty]}/>
              </Flex>
            }>
              <PokemonIndividualParamsPicker
                filter={filter.bySpecialty[specialty]}
                setFilter={(getUpdated) => setFilter(({bySpecialty, ...original}) => ({
                  ...original,
                  bySpecialty: {
                    ...bySpecialty,
                    [specialty]: getUpdated(bySpecialty[specialty]),
                  },
                } satisfies PokemonVanillaPreset))}
                isPremium
                subSkillMap={subSkillMap}
                maxLevel={pokemonMaxLevel}
                noSameLine={false}
              />
            </InputRowWithTitle>
          ))}
        </Flex>
      </AnimatedCollapse>
    </Flex>
  );
};
