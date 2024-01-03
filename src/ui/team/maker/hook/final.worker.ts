import {expose} from 'threads/worker';

import {getTeamMakerFinalResult} from '@/ui/team/maker/calc/main/final';


expose(getTeamMakerFinalResult);
