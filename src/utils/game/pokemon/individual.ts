import {specialtyIdToType} from '@/const/game/pokemon';
import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonIndividualParams, PokemonVanillaPreset} from '@/types/game/pokemon/params';


type GetEffectivePokemonIndividualParamsFromVanillaPresetOpts = {
  vanillaPreset: PokemonVanillaPreset,
  specialty: PokemonSpecialtyId,
};

export const getEffectivePokemonIndividualParamsFromVanillaPreset = ({
  vanillaPreset,
  specialty,
}: GetEffectivePokemonIndividualParamsFromVanillaPresetOpts): PokemonIndividualParams => {
  const {
    shared,
    bySpecialty,
    mode,
  } = vanillaPreset;

  if (mode === 'shared') {
    return shared;
  }

  if (mode === 'bySpecialty') {
    return bySpecialty[specialtyIdToType[specialty]];
  }

  throw new Error(`Unhandled team maker input vanilla preset priority [${mode satisfies never}]`);
};
