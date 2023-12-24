import {PokeInBox} from '@/types/game/pokebox/main';


export const getPokeInBoxEntryKey = ({uuid, pokemon}: PokeInBox) => {
  // `pokemon` is needed because when previewing final evolution,
  // simply using `uuid` will cause component render clash
  return `${uuid}-${pokemon}`;
};
