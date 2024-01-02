import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/fullPack/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonMainSkillTriggerValue} from '@/components/shared/pokemon/mainSkill/triggerValue';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {PokemonMainSkillValue} from '@/components/shared/pokemon/production/params/skillValue';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {getPokemonSorter} from '@/components/shared/pokemon/sorter/calc/main';
import {isPokedexSortExclusion} from '@/components/shared/pokemon/sorter/utils';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {getProducingRateIndividualParams} from '@/utils/game/producing/params';
import {formatFloat, formatFloat3} from '@/utils/number/format';


export const PokedexLinkDetail = React.memo(({
  pokemon,
  pokemonProducingParams,
  display,
  level,
  subSkill,
  nature,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  ingredients,
  snorlaxFavorite,
  calculatedSettings,
  cookingSettings,
}: PokedexLinkProps) => {
  const {
    berry,
    skill,
    stats,
    specialty,
    sleepType,
  } = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const t3 = useTranslations('UI.Common');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <Flex direction="row" className="items-end gap-0.5 text-sm">
        <MainSkillIcon id={skill} dimension="h-6 w-6"/>
        {t(`MainSkill.Name.${skill}`)}
      </Flex>
    );
  }

  if (display === 'ingredient') {
    return <PokemonIngredientIcons ingredients={[ingredients]}/>;
  }

  if (display === 'ingredientRate') {
    return <PokemonIngredientRate params={pokemonProducingParams} dimension="h-4 w-4"/>;
  }

  if (display === 'sleepType') {
    return <PokemonSleepType sleepType={sleepType}/>;
  }

  if (display === 'specialty') {
    return <PokemonSpecialty specialty={specialty}/>;
  }

  if (display === 'frequencyBase') {
    return <PokemonFrequency frequency={stats.frequency}/>;
  }

  if (display === 'mainSkillValue') {
    return <PokemonMainSkillValue params={pokemonProducingParams} dimension="h-4 w-4"/>;
  }

  if (display === 'mainSkillTriggerRate') {
    return <PokemonMainSkillTriggerRate params={pokemonProducingParams} dimension="h-4 w-4"/>;
  }

  const individualParams = getProducingRateIndividualParams({
    input: {level, subSkill, nature},
    pokemon,
    subSkillMap,
  });
  // Need to calculate here because display and sort could be different
  const sorter = getPokemonSorter({
    type: display,
    pokemon,
    pokemonProducingParams,
    berryDataMap,
    ingredientMap,
    ingredients,
    mainSkillMap,
    snorlaxFavorite,
    calculatedSettings,
    cookingSettings,
    dateAdded: null,
    ...individualParams,
  });

  if (display === 'friendshipPoint') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative h-5 w-5">
          <NextImage src="/images/generic/friendship.png" alt={t2('Stats.Friendship')} sizes={imageSmallIconSizes}/>
        </div>
        <div>
          {sorter}
        </div>
      </Flex>
    );
  }

  if (display === 'transferReward') {
    return (
      <Flex direction="row" className="items-end gap-0.5 text-sm">
        <GenericIcon src="/images/generic/candyWhite.png" alt={t3('Candy')} noInvert/>
        <div>{stats.transfer.candy}</div>
      </Flex>
    );
  }

  if (display === 'frequencyOfBerry' || display === 'frequencyOfIngredient') {
    return <PokemonFrequency frequency={sorter}/>;
  }

  if (display === 'timeToFullPack') {
    return <PokemonTimeToFullPack timeToFullPack={sorter}/>;
  }

  if (display === 'id') {
    return `#${sorter}`;
  }

  if (display === 'ingredientEnergy') {
    return (
      <Flex>
        <div className="text-xs">
          <PokemonIngredientIcons ingredients={[ingredients]} dimension="h-4 w-4"/>
        </div>
        <Flex direction="row" className="gap-0.5">
          <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
          <div>
            {formatFloat(sorter)}
          </div>
        </Flex>
      </Flex>
    );
  }

  if (display === 'ingredientCount') {
    const {ingredient} = getPokemonProducingRateSingle({
      pokemon,
      pokemonProducingParams,
      berryData: berryDataMap[pokemon.berry.id],
      ingredientMap,
      ingredients,
      skillData: mainSkillMap[pokemon.skill],
      snorlaxFavorite: {},
      calculatedSettings,
      cookingSettings,
      ...individualParams,
    }).atStage.final;

    return (
      <Flex>
        <div className="text-xs">
          <PokemonIngredientIcons ingredients={[ingredients]} dimension="h-4 w-4"/>
        </div>
        <PokemonIngredientIcons
          numberFormat="float"
          ingredients={[Object.values(ingredient)
            .sort((a, b) => b.quantity.equivalent - a.quantity.equivalent)
            .map(({id, quantity}) => ({
              id,
              qty: quantity.equivalent,
            })),
          ]}
        />
      </Flex>
    );
  }

  if (display === 'frequency') {
    return <PokemonFrequency frequency={sorter}/>;
  }

  if (display === 'berryEnergy' || display === 'berryCount') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        {display === 'berryEnergy' && <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>}
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'totalEnergy') {
    return (
      <Flex direction="row" className="gap-0.5">
        <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkillTriggerValue') {
    return <PokemonMainSkillTriggerValue value={sorter}/>;
  }

  if (display === 'mainSkillDailyCount' || display === 'mainSkillDailyStrength') {
    return (
      <Flex direction="row" className="gap-0.5">
        <MainSkillIcon id={skill}/>
        {display === 'mainSkillDailyStrength' && <ColoredEnergyIcon alt={t2('Stats.Energy.Name')}/>}
        <div>
          {display === 'mainSkillDailyStrength' ? formatFloat(sorter) : formatFloat3(sorter)}
        </div>
      </Flex>
    );
  }

  if (isPokedexSortExclusion(display)) {
    return null;
  }

  console.error(`Unhandled Pokedex display type: [${display satisfies never}]`);
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';
