import {NatureId} from '@/types/game/pokemon/nature';
import {SpecialtyType} from '@/types/game/pokemon/specialty';
import {PokemonSubSkill} from '@/types/game/pokemon/subSkill';


export type PokemonIndividualParams = {
  level: number,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
};

export const pokemonVanillaPresetMode = [
  'shared',
  'bySpecialty',
] as const;

export type PokemonVanillaPresetMode = typeof pokemonVanillaPresetMode[number];

export type PokemonVanillaPreset = {
  mode: PokemonVanillaPresetMode,
  shared: PokemonIndividualParams,
  bySpecialty: {[specialty in SpecialtyType]: PokemonIndividualParams},
};
