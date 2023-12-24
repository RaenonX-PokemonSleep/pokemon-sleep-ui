import {PokeInBox} from '@/types/game/pokebox/main';
import {SleepdexData} from '@/types/game/sleepdex';
import {ActivationDataAtClient, ActivationKeyAtClient} from '@/types/mongo/activation';
import {ActivationPresetMap} from '@/types/mongo/activationPreset';
import {AnnouncementClientMap} from '@/types/mongo/announcement';
import {DocsData, DocsDataEditable, DocsDataEditableFetched} from '@/types/mongo/docs';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettingsBundle} from '@/types/userData/settings';
import {UserTeamAnalysisContent} from '@/types/userData/teamAnalysis';
import {PokedexDisplay} from '@/ui/pokedex/index/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';
import {ToTeamAnalysisCompFromPokeboxOpts} from '@/utils/team/utils';


export type UserDataUploadOpts = {
  type: 'pokedex',
  data: PokedexDisplay,
} | {
  type: 'pokebox.display',
  data: PokeboxViewerDisplay,
} | {
  type: 'pokebox.create' | 'pokebox.upsert',
  data: PokeInBox,
} | {
  type: 'pokebox.delete',
  data: PokeInBox['uuid'],
} | {
  type: 'sleepdex.mark' | 'sleepdex.unmark',
  data: SleepdexData,
} | {
  type: 'teamAnalysis',
  data: UserTeamAnalysisContent,
} | {
  type: 'team.maker.export',
  data: ToTeamAnalysisCompFromPokeboxOpts,
} | {
  type: 'cooking',
  data: UserCookingPreset,
} | {
  type: 'settings',
  data: UserSettingsBundle,
} | {
  type: 'admin.activation.update.key',
  data: ActivationKeyAtClient,
} | {
  type: 'admin.activation.update.data',
  data: ActivationDataAtClient,
} | {
  type: 'admin.activation.delete',
  data: string,
} | {
  type: 'admin.activation.adClick',
  data?: never,
} | {
  type: 'admin.activation.preset.update',
  data: ActivationPresetMap,
} | {
  type: 'admin.announcements',
  data: AnnouncementClientMap,
} | {
  type: 'cms.docs.create',
  data: DocsDataEditable,
} | {
  type: 'cms.docs.edit',
  data: DocsDataEditableFetched,
} | {
  type: 'cms.docs.delete',
  data: Pick<DocsData, 'locale' | 'path'>,
};
