import {ObjectId} from 'bson';
import {Collection, Filter, MongoError, UpdateOneModel} from 'mongodb';
import {v4} from 'uuid';

import {adsFreeByAdsClickDuration} from '@/const/activation/common';
import {getDataAsArray, getSingleData} from '@/controller/common';
import {throwIfNotAdmin} from '@/controller/user/account/common';
import {ControllerRequireUserIdOpts} from '@/controller/user/account/type';
import {addActivationKeyIndex} from '@/controller/user/activation/index';
import {getActivationKey, removeActivationKeyByKey} from '@/controller/user/activation/key';
import mongoPromise from '@/lib/mongodb';
import {
  ActivationData,
  ActivationDataAtClient,
  ActivationKey,
  ActivationProperties,
  activationSourceAutomated,
  ActivationStatus,
  activationType,
} from '@/types/mongo/activation';
import {toActivationDataAtClient} from '@/utils/user/activation/utils';


const getCollection = async (): Promise<Collection<ActivationData>> => {
  const client = await mongoPromise;

  return client
    .db('auth')
    .collection<ActivationData>('activation');
};

export const consumeActivationKey = async (userIdString: string, key: string): Promise<boolean> => {
  const activationKey = await getActivationKey(key);

  if (!activationKey) {
    return false;
  }

  const client = await mongoPromise;
  const collection = await getCollection();
  try {
    await client.withSession(async (session) => {
      await session.withTransaction(async () => {
        const userId = new ObjectId(userIdString);

        await collection.insertOne(
          {userId: new ObjectId(userId), ...activationKey},
          {session},
        );
      });
    });
  } catch (e) {
    if (e instanceof MongoError) {
      console.error(e);
      return false;
    }

    throw e;
  }

  await removeActivationKeyByKey(activationKey.key);
  return true;
};

type AddActivationDataByAdsClick = ControllerRequireUserIdOpts & {
  userId: string
};

export const addActivationDataByAdsClick = async ({
  executorUserId,
  userId,
}: AddActivationDataByAdsClick) => {
  throwIfNotAdmin(executorUserId);

  const key = v4();
  await (await getCollection()).insertOne({
    userId: new ObjectId(userId),
    expiry: new Date(Date.now() + adsFreeByAdsClickDuration),
    source: 'adClick',
    contact: {},
    activation: {adsFree: true},
    generatedAt: new Date(),
    key,
    note: '',
  });

  /* eslint-disable no-console */
  console.log(`Ad-click activation generated for user ${userId} with key ${key}`);
  /* eslint-enable no-console */
};

type GetActivationDataByFilterOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationData>,
};

export const getActivationDataByFilter = ({executorUserId, filter}: GetActivationDataByFilterOpts) => {
  throwIfNotAdmin(executorUserId);

  return getSingleData(getCollection(), filter);
};

export const getUserActivationList = async (userId: string | undefined): Promise<ActivationData[]> => {
  return getDataAsArray(getCollection(), {userId: new ObjectId(userId)});
};

export const getActivationStatus = async (userId: string): Promise<ActivationStatus> => {
  const activationStatus: ActivationStatus = Object.fromEntries(activationType.map((type) => [type, false]));
  for (const {activation} of await getUserActivationList(userId)) {
    for (const type of activationType) {
      activationStatus[type] ||= activation[type];
    }
  }

  return activationStatus;
};

type GetAllActivationDataOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationData>,
};

export const getAllActivationData = ({executorUserId, filter}: GetAllActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return getDataAsArray(getCollection(), filter);
};

export const getAllActivationDataAsClient = async (): Promise<ActivationDataAtClient[]> => {
  return (await getAllActivationData({executorUserId: process.env.NEXTAUTH_ADMIN_UID, filter: {}}))
    .map(toActivationDataAtClient);
};

export const getPaidUserCount = async () => (await getCollection()).countDocuments({
  source: {
    $nin: [null, ...activationSourceAutomated],
  },
});

type UpdateActivationDataPropertiesSingleOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationData>,
  update: ActivationProperties,
};

export const updateActivationDataPropertiesSingle = async ({
  executorUserId,
  filter,
  update,
}: UpdateActivationDataPropertiesSingleOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).updateOne(filter, {$set: update});
};

type UpdateActivationDataPropertiesBatchOpts = ControllerRequireUserIdOpts & {
  updates: UpdateOneModel<ActivationData>[]
};

export const updateActivationDataPropertiesBatch = async ({
  executorUserId,
  updates,
}: UpdateActivationDataPropertiesBatchOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).bulkWrite(
    updates.map((updateOne) => ({updateOne})),
    {ordered: false},
  );
};

type UpdateActivationDataByKeyOpts = ControllerRequireUserIdOpts & ActivationProperties & {
  key: ActivationData['key'],
};

export const updateActivationDataByKey = async ({
  executorUserId,
  key,
  activation,
  expiry,
  source,
  contact,
  isCmsMod,
  isActivationLocked,
  isFrozen,
  note,
}: UpdateActivationDataByKeyOpts) => updateActivationDataPropertiesSingle({
  executorUserId,
  filter: {key},
  // Explicit to avoid properties accidentally passed in, overwriting the data
  update: {
    activation,
    expiry,
    source,
    contact,
    isCmsMod: isCmsMod ?? false,
    isActivationLocked: isActivationLocked ?? false,
    isFrozen: isFrozen ?? false,
    note,
  } satisfies Required<ActivationProperties>,
});

type RemoveActivationDataOpts = ControllerRequireUserIdOpts & {
  filter: Filter<ActivationKey>,
};

export const removeActivationDataSingle = async ({executorUserId, filter}: RemoveActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteOne(filter);
};

export const removeActivationDataBatch = async ({executorUserId, filter}: RemoveActivationDataOpts) => {
  throwIfNotAdmin(executorUserId);

  return (await getCollection()).deleteMany(filter);
};

type RemoveActivationDataByKeyOpts = ControllerRequireUserIdOpts & {
  key: ActivationData['key'],
};

export const removeActivationDataByKey = ({executorUserId, key}: RemoveActivationDataByKeyOpts) => (
  removeActivationDataSingle({executorUserId, filter: {key}})
);

const addIndex = async () => Promise.all([
  addActivationKeyIndex(getCollection),
  (await getCollection()).createIndex({userId: 1}),
]);

addIndex().catch((e) => console.error('MongoDB failed to initialize user activation data index', e));
