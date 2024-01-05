import React from 'react';

import {Menu, Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {dropdownExpandStyle} from '@/components/dropdown/const';
import {DropdownExpandOrigin, DropdownItemList} from '@/components/dropdown/type';
import {Flex} from '@/components/layout/flex/common';


type Props = {
  button: React.ReactNode,
  itemList: DropdownItemList,
  origin: DropdownExpandOrigin,
};

export const DropDown = ({button, itemList, origin}: Props) => {
  return (
    <Menu as="div" className="relative w-fit">
      <Menu.Button>
        {button}
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={clsx(
          'info-section-opaque divide-horizontal border-common absolute z-50 w-fit rounded-lg border',
          dropdownExpandStyle[origin],
        )}>
          {itemList.map((group) => (
            <Flex className="gap-1 p-1">
              {group.map((item) => (
                <Menu.Item>
                  {({active}) => item({active})}
                </Menu.Item>
              ))}
            </Flex>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
