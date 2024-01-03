import {TeamMakerResult} from '@/ui/team/maker/type/result';


export type TeamMakerState = {
  status: 'standby' | 'error',
  result: null,
  teamCompsCalculated: null,
  teamCompsTotal: null,
  cancel: false,
} | {
  status: 'initializing',
  result: null,
  teamCompsCalculated: null,
  teamCompsTotal: null,
  cancel: boolean,
} | {
  status: 'generatingTeams',
  result: null,
  teamCompsCalculated: null,
  teamCompsTotal: number,
  cancel: boolean,
} | {
  status: 'calculating',
  result: TeamMakerResult | null,
  teamCompsCalculated: number,
  teamCompsTotal: number,
  cancel: boolean,
} | {
  status: 'completed',
  result: TeamMakerResult,
  teamCompsCalculated: number,
  teamCompsTotal: number,
  cancel: false,
} | {
  status: 'canceled',
  result: TeamMakerResult | null,
  teamCompsCalculated: number | null,
  teamCompsTotal: number | null,
  cancel: false,
};

export type TeamMakerStatus = TeamMakerState['status'];
