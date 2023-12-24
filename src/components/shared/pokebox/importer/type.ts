import {PokemonInputFilter, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {PokeInBox} from '@/types/game/pokebox/main';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';


export type PokeboxImporterCommonProps = UsePokemonFilterCommonData & {
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  onPokeboxPicked: (pokeInBox: PokeInBox) => void,
};

export type PokeInBoxForFilter = Omit<PokeInBox, 'name' | 'pokemon'> & {
  name: string,
  search: string[],
  pokemon: PokemonInfo,
};

export type PokeboxImporterFilter = PokemonInputFilter & {
  name: string,
};
