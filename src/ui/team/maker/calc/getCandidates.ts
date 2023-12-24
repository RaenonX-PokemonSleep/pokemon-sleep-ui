import {CookingUserSettings} from '@/types/userData/settings';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {
  getSortedTeamMakerIntermediateRate,
  isCurrentTeamMakerBasisValueWorse,
  sumTeamMakerBasisValue,
} from '@/ui/team/maker/calc/utils';
import {TeamMakerIntermediateRate} from '@/ui/team/maker/type/common';
import {TeamMakerInput} from '@/ui/team/maker/type/input';
import {generateSegments} from '@/utils/array';


type GetTeamMakerCandidatesOpts = {
  input: TeamMakerInput,
  cookingSettings: CookingUserSettings,
  rates: TeamMakerIntermediateRate[],
};

export const getTeamMakerCandidates = ({
  input,
  cookingSettings,
  rates,
}: GetTeamMakerCandidatesOpts): TeamMakerIntermediateRate[] => {
  const {basis, memberCount} = input;

  if (rates.length <= memberCount) {
    return rates;
  }

  const sortedOriginalRates = getSortedTeamMakerIntermediateRate({
    basis: input.basis,
    stage: 'original',
    rates,
  });
  const topCompAtOriginal = sortedOriginalRates.slice(0, memberCount);

  const sortedFinalRates = getSortedTeamMakerIntermediateRate({
    basis: input.basis,
    stage: 'final',
    rates,
  });
  const topCompAtFinal = rates.slice(0, memberCount);

  const stopThreshold = sumTeamMakerBasisValue(topCompAtOriginal.map(({rate}) => (
    getTeamMakerBasisValue({
      pokemonRate: rate.atStage.original,
      targetMeals: cookingSettings.targetMeals,
    })
  )));

  const ret: Map<string, TeamMakerIntermediateRate> = new Map();
  for (const rate of [...topCompAtOriginal, ...topCompAtFinal]) {
    ret.set(rate.pokeInBox.uuid, rate);
  }

  for (const currentComp of generateSegments(memberCount, sortedFinalRates)) {
    const tail = currentComp.at(-1);
    if (!tail) {
      continue;
    }

    const currentCompBasisValue = sumTeamMakerBasisValue(currentComp.map(({rate}) => getTeamMakerBasisValue({
      pokemonRate: rate.atStage.final,
      targetMeals: cookingSettings.targetMeals,
    })));

    if (isCurrentTeamMakerBasisValueWorse({
      basis,
      current: currentCompBasisValue,
      baseline: stopThreshold,
    })) {
      break;
    }

    ret.set(tail.pokeInBox.uuid, tail);
  }

  return [...ret.values()];
};
