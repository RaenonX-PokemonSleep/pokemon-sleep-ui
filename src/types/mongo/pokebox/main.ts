import {PokeInBox} from '@/types/game/pokebox/main';
import {Optional} from '@/utils/type';


export type PokeInBoxData = Optional<PokeInBox, 'dateAdded'> & {
  owner: string,
};
