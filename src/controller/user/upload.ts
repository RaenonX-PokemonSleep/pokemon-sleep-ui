import {updateAnnouncements} from '@/controller/announcement/main';
import {addDoc, deleteDoc, updateDoc} from '@/controller/docs';
import {addSinglePokeInBox, deleteSinglePokeInBox, upsertSinglePokeInBox} from '@/controller/pokebox/main';
import {addSleepdexRecord, removeSleepdexRecord} from '@/controller/sleepdex';
import {
  addActivationDataByAdsClick,
  removeActivationDataByKey,
  updateActivationDataByKey,
} from '@/controller/user/activation/data';
import {updateActivationKeyByKey} from '@/controller/user/activation/key';
import {updateActivationPresets} from '@/controller/user/activation/preset';
import {
  userDataCooking,
  userDataPokeboxDisplay,
  userDataPokedex,
  userDataSettings,
} from '@/controller/user/manager';
import {addTeamAnalysisComp, updateTeamAnalysisComps} from '@/controller/user/teamAnalysis/comp';
import {updateTeamAnalysisConfig} from '@/controller/user/teamAnalysis/config';
import {UserDataUploadOpts} from '@/types/userData/upload';
import {invalidateDocsPathCaching} from '@/utils/docs';
import {toTeamAnalysisCompFromPokebox} from '@/utils/team/utils';
import {toActivationProperties} from '@/utils/user/activation/utils';


type UploadUserDataOpts = {
  userId: string,
  opts: UserDataUploadOpts,
};

export const uploadUserData = async ({userId, opts}: UploadUserDataOpts) => {
  const {type, data} = opts;

  if (type === 'pokedex') {
    await userDataPokedex.setData(userId, data);
    return;
  }

  if (type === 'pokebox.display') {
    await userDataPokeboxDisplay.setData(userId, data);
    return;
  }

  if (type === 'pokebox.create') {
    await addSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'pokebox.upsert') {
    await upsertSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'pokebox.delete') {
    await deleteSinglePokeInBox(userId, data);
    return;
  }

  if (type === 'sleepdex.mark') {
    await addSleepdexRecord(userId, data);
    return;
  }

  if (type === 'sleepdex.unmark') {
    await removeSleepdexRecord(userId, data);
    return;
  }

  if (type === 'teamAnalysis') {
    const {config, comps} = data;

    await Promise.all([
      updateTeamAnalysisConfig({userId, config}),
      updateTeamAnalysisComps({userId, comps}),
    ]);
    return;
  }

  if (type === 'team.maker.export') {
    await addTeamAnalysisComp({
      userId,
      comp: toTeamAnalysisCompFromPokebox(data),
    });
    return;
  }

  if (type === 'cooking') {
    await userDataCooking.setData(userId, data);
    return;
  }

  if (type === 'settings') {
    const {settings, cooking} = data;
    await Promise.all([
      userDataSettings.setData(userId, settings),
      userDataCooking.setData(userId, cooking),
    ]);
    return;
  }

  if (type === 'admin.activation.update.key') {
    const {key} = data;
    await updateActivationKeyByKey({
      key,
      executorUserId: userId,
      ...toActivationProperties(data),
    });
    return;
  }

  if (type === 'admin.activation.update.data') {
    const {key} = data;
    await updateActivationDataByKey({
      key,
      executorUserId: userId,
      ...toActivationProperties(data),
    });
    return;
  }

  if (type === 'admin.activation.delete') {
    await removeActivationDataByKey({executorUserId: userId, key: data});
    return;
  }

  if (type === 'admin.activation.adClick') {
    await addActivationDataByAdsClick({executorUserId: process.env.NEXTAUTH_ADMIN_UID, userId});
    return;
  }

  if (type === 'admin.activation.preset.update') {
    await updateActivationPresets({executorUserId: userId, data});
    return;
  }

  if (type === 'admin.announcements') {
    await updateAnnouncements({executorUserId: userId, data});
    return;
  }

  if (type === 'cms.docs.create') {
    await addDoc({executorUserId: userId, doc: data});
    invalidateDocsPathCaching(data);
    return;
  }

  if (type === 'cms.docs.edit') {
    await updateDoc({executorUserId: userId, doc: data});
    invalidateDocsPathCaching(data);
    return;
  }

  if (type === 'cms.docs.delete') {
    await deleteDoc({executorUserId: userId, ...data});
    return;
  }

  console.error(`Unhandled user data upload type: [${type satisfies never}]`);
};
