import {ProductionPeriod} from '@/types/game/producing/display';
import {
  GroupedProducingRate,
  PokemonProducingRate,
  PokemonProducingRateByType,
  ProducingRateOfStates,
} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';


type GroupProducingRatesOpts = {
  period: ProductionPeriod,
  rates: ProducingRateOfStates[],
  state: ProducingStateOfRate,
};

export const groupProducingRates = ({
  period,
  rates,
  state,
}: GroupProducingRatesOpts): GroupedProducingRate<number> => {
  return rates.reduce((group, single) => {
    const {id, quantity, energy} = single;

    group[id] = {
      period,
      quantity: (group[id]?.quantity ?? 0) + quantity[state],
      energy: (group[id]?.energy ?? 0) + energy[state],
    };
    return group;
  }, {} as GroupedProducingRate<number>);
};

type GroupPokemonProducingRateOpts = {
  period: ProductionPeriod,
  rates: PokemonProducingRate[],
  state: ProducingStateOfRate,
};

export const groupPokemonProducingRate = ({
  period,
  rates,
  state,
}: GroupPokemonProducingRateOpts): PokemonProducingRateByType => {
  return {
    berry: groupProducingRates({
      period,
      rates: rates.map(({berry}) => berry),
      state,
    }),
    ingredient: groupProducingRates({
      period,
      rates: rates.flatMap(({ingredient}) => Object.values(ingredient)),
      state,
    }),
    skill: groupProducingRates({
      period,
      rates: rates.map(({skill}) => skill),
      state,
    }),
  };
};
