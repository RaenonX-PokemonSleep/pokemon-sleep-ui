import {ObjectId} from 'bson';
import {Filter} from 'mongodb';

import {
  getSinglePokeInBox,
  getUserPokebox,
  getUserPokeboxSorted,
  getUserPokeboxWithFilter,
} from '@/controller/pokebox/main';
import {getSleepdexMap, getSleepdexMapOfPokemon} from '@/controller/sleepdex';
import {getActivationDataByFilter} from '@/controller/user/activation/data';
import {generateActivationKey, getActivationKeyByFilter} from '@/controller/user/activation/key';
import {getTeamAnalysisCompsOfUser, getTeamMemberById} from '@/controller/user/teamAnalysis/comp';
import {getTeamAnalysisConfigOfUser} from '@/controller/user/teamAnalysis/config';
import {ActivationData} from '@/types/mongo/activation';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {UserLazyLoadedData} from '@/types/userData/main';
import {
  toActivationDataAtClient,
  toActivationKeyAtClient,
  toActivationProperties,
} from '@/utils/user/activation/utils';
import {extractTeamMemberId} from '@/utils/user/teamAnalysis';


type GetUserLazyDataOpts = {
  userId: string,
  options: UserDataLoadingOpts,
};

const loadData = async ({userId, options}: GetUserLazyDataOpts) => {
  const {type, opts} = options;

  if (type === 'teamAnalysis') {
    const [config, comps] = await Promise.all([
      getTeamAnalysisConfigOfUser(userId),
      getTeamAnalysisCompsOfUser(userId),
    ]);

    if (!config) {
      return undefined;
    }

    return {config, comps} satisfies UserLazyLoadedData['teamAnalysis'];
  }

  if (type === 'teamAnalysisMember') {
    const teamMemberId = extractTeamMemberId(opts.teamMemberId);
    if (!teamMemberId) {
      return undefined;
    }

    const member = await getTeamMemberById(teamMemberId);
    if (!member) {
      return undefined;
    }

    return member satisfies UserLazyLoadedData['teamAnalysisMember'];
  }

  if (type === 'pokebox') {
    return await getUserPokebox(userId) satisfies UserLazyLoadedData['pokebox'];
  }

  if (type === 'pokeboxSingle') {
    return (await getSinglePokeInBox(opts.pokeInBoxUuid) ?? undefined) satisfies UserLazyLoadedData['pokeboxSingle'];
  }

  if (type === 'pokeboxSorted') {
    return await getUserPokeboxSorted(userId) satisfies UserLazyLoadedData['pokeboxSorted'];
  }

  if (type === 'pokeboxWithFilter') {
    return await getUserPokeboxWithFilter(userId, opts) satisfies UserLazyLoadedData['pokeboxWithFilter'];
  }

  if (type === 'sleepdex') {
    return await getSleepdexMap(userId) satisfies UserLazyLoadedData['sleepdex'];
  }

  if (type === 'sleepdexOfPokemon') {
    return await getSleepdexMapOfPokemon(userId, opts.pokemonId) satisfies UserLazyLoadedData['sleepdexOfPokemon'];
  }

  if (type === 'adminActivationCreate') {
    const activationLink = await generateActivationKey({
      executorUserId: userId,
      ...toActivationProperties(opts),
    });

    return (activationLink ?? '(Duplicated)') satisfies UserLazyLoadedData['adminActivationCreate'];
  }

  if (type === 'adminActivationCheck') {
    const {key} = opts;

    const activationKey = await getActivationKeyByFilter({
      executorUserId: userId,
      filter: {key},
    });
    if (activationKey) {
      return {
        type: 'key',
        data: toActivationKeyAtClient(activationKey),
      } satisfies UserLazyLoadedData['adminActivationCheck'];
    }

    const userIdOfKey = opts.userId;
    const filter: Filter<ActivationData> | null = (
      key ? {key} : (userIdOfKey ? {userId: new ObjectId(userIdOfKey)} : null)
    );
    if (!filter) {
      return null satisfies UserLazyLoadedData['adminActivationCheck'];
    }

    const activationData = await getActivationDataByFilter({
      executorUserId: userId,
      filter,
    });
    if (activationData) {
      return {
        type: 'data',
        data: toActivationDataAtClient(activationData),
      } satisfies UserLazyLoadedData['adminActivationCheck'];
    }

    return null satisfies UserLazyLoadedData['adminActivationCheck'];
  }

  if (type === 'buildId') {
    return process.env.NEXT_PUBLIC_BUILD_ID satisfies UserLazyLoadedData['buildId'];
  }

  console.error(`Unknown data type ${type satisfies never} to load data`);
  return undefined;
};

export const getUserLazyData = async (opts: GetUserLazyDataOpts): Promise<UserLazyLoadedData> => {
  const {options} = opts;

  return {
    [options.type]: await loadData(opts),
  };
};
