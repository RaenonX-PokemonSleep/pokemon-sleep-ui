import React from 'react';


export type DropdownItemOpts = {
  active: boolean,
};

export type DropdownItem = (opts: DropdownItemOpts) => React.ReactElement;

export type DropdownItemGroup = DropdownItem[];

export type DropdownItemList = DropdownItemGroup[];

export type DropdownExpandOrigin = 'topRight';
