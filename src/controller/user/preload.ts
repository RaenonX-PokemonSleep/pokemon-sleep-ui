import {migrateUserCookingData} from '@/controller/migrate/userCooking';
import {
  userDataCooking,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataSettings,
} from '@/controller/user/manager';
import {UserPreloadedData} from '@/types/userData/main';


const getUserCookingData = async (userId: string) => {
  const data = await userDataCooking.getData(userId);

  if (data) {
    return data;
  }

  await migrateUserCookingData(userId);

  return await userDataCooking.getData(userId);
};

export const getUserPreloadedData = async (userId: string): Promise<UserPreloadedData> => {
  const [
    cooking,
    pokedex,
    pokeboxDisplay,
    settings,
  ] = await Promise.all([
    getUserCookingData(userId),
    userDataPokedex.getData(userId),
    userDataPokeboxDisplay.getData(userId),
    userDataSettings.getData(userId),
  ]);

  return {
    cooking: cooking?.data,
    pokedex: pokedex?.data,
    pokeboxDisplay: pokeboxDisplay?.data,
    settings: settings?.data,
  };
};
