import {clsx} from 'clsx';

import {SpecialtyClassMap} from '@/styles/type';
import {PokemonSpecialtyId} from '@/types/game/pokemon';


const specialtyBgClassInactive: SpecialtyClassMap = {
  1: clsx(
    'transform-smooth bg-green-700 dark:bg-green-500',
    'group-hover:bg-green-500 group-hover:dark:bg-green-700',
  ),
  2: clsx(
    'transform-smooth bg-amber-600 dark:bg-yellow-400',
    'group-hover:bg-yellow-400 group-hover:dark:bg-yellow-600',
  ),
  3: clsx(
    'transform-smooth bg-blue-600 dark:bg-blue-400',
    'group-hover:bg-blue-400 group-hover:dark:bg-blue-600',
  ),
};

const specialtyBgClassActive: SpecialtyClassMap = {
  1: clsx(
    'transform-smooth bg-green-500 dark:bg-green-700',
    'group-hover:bg-green-700 group-hover:dark:bg-green-500',
  ),
  2: clsx(
    'transform-smooth bg-yellow-400 dark:bg-amber-600',
    'group-hover:bg-yellow-600 group-hover:dark:bg-yellow-400',
  ),
  3: clsx(
    'transform-smooth bg-blue-400 dark:bg-blue-600',
    'group-hover:bg-blue-600 group-hover:dark:bg-blue-400',
  ),
};

export const getSpecialtyBgClass = (specialty: PokemonSpecialtyId, isActive: boolean) => (
  isActive ? specialtyBgClassActive[specialty] : specialtyBgClassInactive[specialty]
);

const specialtyTextClassInactive: SpecialtyClassMap = {
  1: clsx(
    'transform-smooth text-green-700 dark:text-green-500',
    'group-hover:text-green-500 group-hover:dark:text-green-700',
  ),
  2: clsx(
    'transform-smooth text-amber-600 dark:text-yellow-400',
    'group-hover:text-yellow-400 group-hover:dark:text-amber-600',
  ),
  3: clsx(
    'transform-smooth text-blue-600 dark:text-blue-400',
    'group-hover:text-blue-400 group-hover:dark:text-blue-600',
  ),
};

const specialtyTextClassActive: SpecialtyClassMap = {
  1: clsx(
    'transform-smooth text-green-500 dark:text-green-700',
    'group-hover:text-green-700 group-hover:dark:text-green-500',
  ),
  2: clsx(
    'transform-smooth text-yellow-400 dark:text-amber-600',
    'group-hover:text-amber-600 group-hover:dark:text-yellow-400',
  ),
  3: clsx(
    'transform-smooth text-blue-400 dark:text-blue-600',
    'group-hover:text-blue-600 group-hover:dark:text-blue-400',
  ),
};

export const getSpecialtyTextClass = (specialty: PokemonSpecialtyId, isActive: boolean) => (
  isActive ? specialtyTextClassActive[specialty] : specialtyTextClassInactive[specialty]
);

export const specialtyTextClassDefault = specialtyTextClassInactive;
