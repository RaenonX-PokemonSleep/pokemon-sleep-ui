import {Collection, Filter, WithId} from 'mongodb';

import {runPokeBoxMigrations} from '@/controller/migrate/pokebox';
import mongoPromise from '@/lib/mongodb';
import {Pokebox, PokeInBox} from '@/types/game/pokebox/main';
import {PokeInBoxData} from '@/types/mongo/pokebox/main';


const getCollection = async (): Promise<Collection<PokeInBoxData>> => {
  const client = await mongoPromise;

  return client
    .db('user')
    .collection<PokeInBoxData>('pokebox');
};

const pokeInBoxDataToPokeInBox = ({_id, dateAdded, ...rest}: WithId<PokeInBoxData>): PokeInBox => ({
  ...rest,
  dateAdded: dateAdded ?? _id.getTimestamp().getTime(),
});

export const getUserPokeboxWithFilter = async (
  owner: string,
  filter: Filter<PokeInBoxData>,
): Promise<PokeInBox[]> => {
  await migratePokeboxOfUser(owner);

  return await (await getCollection())
    .find({...filter, owner}, {projection: {owner: false}, sort: [['pokemon', 'asc'], ['level', 'desc']]})
    .map(pokeInBoxDataToPokeInBox)
    .toArray();
};

export const getUserPokeboxSorted = async (owner: string | undefined): Promise<PokeInBox[]> => {
  if (!owner) {
    return [];
  }

  return getUserPokeboxWithFilter(owner, {});
};

export const getUserPokebox = async (owner: string | undefined): Promise<Pokebox> => {
  if (!owner) {
    return {};
  }

  const pokeboxArray = await getUserPokeboxSorted(owner);

  return Object.fromEntries(pokeboxArray.map((pokeInBox) => [pokeInBox.uuid, pokeInBox]));
};

export const getSinglePokeInBox = async (uuid: string): Promise<PokeInBox | null> => {
  const data = await (await getCollection()).findOne({uuid});

  if (!data) {
    return null;
  }

  return pokeInBoxDataToPokeInBox(data);
};

export const addSinglePokeInBox = async (owner: string, pokeInBox: PokeInBox) => (await getCollection()).insertOne({
  owner,
  ...pokeInBox,
});

export const upsertSinglePokeInBox = async (owner: string, pokeInBox: PokeInBox) => (await getCollection()).updateOne(
  {owner, uuid: pokeInBox.uuid},
  {$set: {owner, ...pokeInBox}},
  {upsert: true},
);

export const deleteSinglePokeInBox = async (owner: string, uuid: PokeInBox['uuid']) => (
  (await getCollection()).deleteOne({owner, uuid})
);

export const migratePokeboxOfUser = async (owner: string) => {
  runPokeBoxMigrations(getCollection, owner)
    .catch((e) => console.error(`MongoDB failed to do run Pokebox migrations for ${owner}`, e));
};

const addIndex = async () => {
  const collection = await getCollection();

  return Promise.all([
    collection.createIndex({owner: 1}),
    collection.createIndex({uuid: 1}, {unique: true}),
  ]);
};

addIndex().catch((e) => console.error('MongoDB failed to initialize Pokebox index', e));
