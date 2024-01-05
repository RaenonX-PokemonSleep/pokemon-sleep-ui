import {AnyBulkWriteOperation, Collection} from 'mongodb';

import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getPokedexMap} from '@/controller/pokemon/info';
import {
  IngredientChain,
  IngredientLevel,
  ingredientLevels,
  IngredientProduction,
} from '@/types/game/pokemon/ingredient';
import {PokeInBoxData} from '@/types/mongo/pokebox/main';
import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution';


type RandomIngredient = {
  level: IngredientLevel,
  id: number,
  quantity: number,
};

const randomIngredientToProduction = (
  chain: IngredientChain,
  level: IngredientLevel,
  randomIngredient?: RandomIngredient,
): IngredientProduction => {
  if (!randomIngredient) {
    const ret = chain.ingredients[level].at(0);

    if (!ret) {
      throw new Error(`Chain ID #${chain} doesn't have production at level ${level}`);
    }

    return ret;
  }

  const possibilities = chain.ingredients[randomIngredient.level];

  const production = possibilities
    .find(({id, qty}) => randomIngredient.id === id && randomIngredient.quantity === qty);

  if (production) {
    return production;
  }

  const productionOfSameId = possibilities
    .find(({id}) => randomIngredient.id === id);

  if (productionOfSameId) {
    return productionOfSameId;
  }

  return possibilities[0];
};

type MigrateRandomIngredientsOpts = {
  collection: Collection<PokeInBoxData>,
  owner: string,
};

const migrateRandomIngredients = async ({
  collection,
  owner,
}: MigrateRandomIngredientsOpts) => {
  const pokebox = await collection.find({ingredients: {$exists: false}, owner}).toArray();
  if (!pokebox.length) {
    return;
  }

  const [pokedex, ingredientChainMap] = await Promise.all([
    getPokedexMap(),
    getIngredientChainMap(),
  ]);

  const bulkUpdate: AnyBulkWriteOperation<PokeInBoxData>[] = [];
  for await (const pokeInBox of pokebox) {
    // @ts-ignore
    const randomIngredients = pokeInBox['randomIngredient'] as (RandomIngredient[] | undefined);
    const pokemon = pokedex[pokeInBox.pokemon];

    if (!randomIngredients?.length || !pokemon) {
      continue;
    }

    const chain = ingredientChainMap[pokemon.ingredientChain];

    bulkUpdate.push({
      updateOne: {
        filter: {_id: pokeInBox._id},
        update: {
          $set: {
            ingredients: Object.fromEntries(ingredientLevels.map((level) => [
              level,
              randomIngredientToProduction(
                chain,
                level,
                randomIngredients.find((random) => random.level === level),
              ),
            ])) as Record<IngredientLevel, IngredientProduction>,
          },
        },
      },
    });
  }

  if (bulkUpdate.length) {
    await collection.bulkWrite(bulkUpdate, {ordered: false});
  }
};

const migrateCarryLimitToEvolutionCount = async ({
  collection,
  owner,
}: MigrateRandomIngredientsOpts) => {
  const pokebox = await collection.find({evolutionCount: {$exists: false}, owner}).toArray();
  if (!pokebox.length) {
    return;
  }

  const [pokedex] = await Promise.all([
    getPokedexMap(),
  ]);

  const bulkUpdate: AnyBulkWriteOperation<PokeInBoxData>[] = [];
  for await (const pokeInBox of pokebox) {
    const pokemon = pokedex[pokeInBox.pokemon];

    if (!pokemon) {
      continue;
    }

    bulkUpdate.push({
      updateOne: {
        filter: {_id: pokeInBox._id},
        update: {
          $set: {
            evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
          },
          $unset: {
            carryLimit: true,
          },
        },
      },
    });
  }

  if (bulkUpdate.length) {
    await collection.bulkWrite(bulkUpdate, {ordered: false});
  }
};

export const runPokeBoxMigrations = async (getCollection: () => Promise<Collection<PokeInBoxData>>, owner: string) => {
  const collection = await getCollection();

  return Promise.all([
    migrateRandomIngredients({collection, owner}),
    migrateCarryLimitToEvolutionCount({collection, owner}),
  ]);
};
