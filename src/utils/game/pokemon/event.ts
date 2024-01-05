import {defaultPokemonEventType} from '@/const/game/pokemon';
import {PokemonInfo} from '@/types/game/pokemon';


export const isPokemonEventOnly = ({eventType}: PokemonInfo) => eventType !== defaultPokemonEventType;
