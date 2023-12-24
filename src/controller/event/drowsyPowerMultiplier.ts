import {millisecondsInDay} from 'date-fns/constants';
import {Collection} from 'mongodb';

import {getDataAsArray} from '@/controller/common';
import mongoPromise from '@/lib/mongodb';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';


const getCollection = async (): Promise<Collection<EventDrowsyPowerMultiplierData>> => {
  const client = await mongoPromise;

  return client
    .db('event')
    .collection<EventDrowsyPowerMultiplierData>('drowsyPowerMultiplier');
};

export const getPossiblyActiveDrowsyPowerMultiplier = (): Promise<EventDrowsyPowerMultiplierData[]> => {
  return getDataAsArray(
    getCollection(),
    // Get multipliers within the time range of (current - 24 hrs) to (current + 24 hrs)
    {startEpoch: {$gt: Date.now() - millisecondsInDay}, endEpoch: {$lt: Date.now() + millisecondsInDay}},
    {startEpoch: 1},
  );
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({entryId: 1}, {unique: true}),
    collection.createIndex({startEpoch: 1, endEpoch: 1}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize event drowsy power multiplier index', e));
