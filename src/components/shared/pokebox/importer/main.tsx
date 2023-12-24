import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {PokeboxImporterView} from '@/components/shared/pokebox/importer/pokebox';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokeboxImporterViaUuid} from '@/components/shared/pokebox/importer/uuid';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {PokeInBox} from '@/types/game/pokebox/main';


type Props = PokeboxImporterCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
  isPokeInBoxIncluded?: (pokeInBox: PokeInBox) => boolean,
};

export const PokeboxImporter = ({show, setShow, isPokeInBoxIncluded, ...props}: Props) => {
  const session = useSession();

  return (
    <PopupCommon show={show} setShow={setShow}>
      <Flex className="gap-1.5 sm:w-[60vw]">
        <PokeboxImporterViaUuid {...props}/>
        <UserDataLazyLoad
          options={{type: 'pokeboxSorted'}}
          loadingText="Pokebox"
          sessionOverride={session}
          actDeps={[show]}
          toAct={() => show}
          content={(data) => (
            <PokeboxImporterView
              pokebox={(data?.pokeboxSorted ?? [])
                .filter((pokeInBox) => isPokeInBoxIncluded ? isPokeInBoxIncluded(pokeInBox) : true)}
              {...props}
            />
          )}
        />
      </Flex>
    </PopupCommon>
  );
};
