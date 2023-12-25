import isEqual from 'lodash/isEqual';
import {useCustomCompareMemo} from 'use-custom-compare';

import {UseUserDataOpts} from '@/hooks/userData/type';
import {UserCookingPreset} from '@/types/userData/cooking';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const useUserCookingPreset = ({server, client}: UseUserDataOpts<UserCookingPreset>): UserCookingPreset => {
  return useCustomCompareMemo(
    () => cloneMerge(server, client),
    [server, client],
    (prev, next) => isEqual(prev, next),
  );
};
