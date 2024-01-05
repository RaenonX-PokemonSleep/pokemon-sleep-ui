import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {PokemonVanillaPreset} from '@/types/game/pokemon/params';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {UserCookingPreset} from '@/types/userData/cooking';
import {TeamMakerMemberCount} from '@/ui/team/maker/type/common';


export const teamMakerBasis = [
  'strength',
  'mealCoverage',
] as const;

export type TeamMakerBasis = typeof teamMakerBasis[number];

export const teamMakerSource = [
  'pokebox',
  'vanilla',
] as const;

export type TeamMakerSource = typeof teamMakerSource[number];

export type TeamMakerInput = Pick<UserCookingPreset, 'mealType' | 'target' | 'recipeLevel' | 'ingredientCount'> & {
  source: TeamMakerSource,
  snorlaxFavorite: SnorlaxFavorite,
  pokemon: PokemonInputFilter,
  memberCount: TeamMakerMemberCount,
  basis: TeamMakerBasis,
  previewLevel: PokemonKeyLevel | null,
  vanillaPresets: PokemonVanillaPreset,
  previewFinalEvolution: boolean,
  showInsufficientIngredients: boolean,
};
