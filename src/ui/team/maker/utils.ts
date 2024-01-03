import {TeamMakerResultComp} from '@/ui/team/maker/type/result';
import {TeamMakerStatus} from '@/ui/team/maker/type/state';


export const isTeamMakerStatusLoading = (status: TeamMakerStatus) => {
  return status !== 'standby' && status !== 'completed' && status !== 'error' && status !== 'canceled';
};

export const getTeamMakerResultCompId = (comp: TeamMakerResultComp): string => {
  return comp.rates.rates.map(({payload}) => payload.pokeInBox.uuid).join('|');
};
