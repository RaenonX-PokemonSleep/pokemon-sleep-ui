import React from 'react';

import PencilIcon from '@heroicons/react/24/outline/PencilIcon';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {docsEditorDisplayTypeIcon} from '@/components/shared/docs/editor/const';
import {docsEditorDisplayType, DocsEditorDisplayType} from '@/components/shared/docs/editor/type';


type Props = {
  display: DocsEditorDisplayType,
  setDisplay: (updated: DocsEditorDisplayType) => void,
};

export const DocsEditorDisplayToggle = ({display, setDisplay}: Props) => {
  return (
    <FilterExpandedInput
      onClick={(display) => setDisplay(display)}
      isActive={(current) => current === display}
      title={
        <Flex center>
          <PencilIcon className="h-6 w-6"/>
        </Flex>
      }
      ids={[...docsEditorDisplayType]}
      idToButton={(display) => (
        <div className="h-6 w-6">
          {docsEditorDisplayTypeIcon[display]}
        </div>
      )}
    />
  );
};
