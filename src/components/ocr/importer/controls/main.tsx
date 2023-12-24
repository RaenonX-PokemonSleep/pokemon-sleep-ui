import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {OcrImporterConfirm} from '@/components/ocr/importer/controls/confirm';
import {OcrImporterImagePreview} from '@/components/ocr/importer/controls/image';
import {OcrImporterProcessedImage} from '@/components/ocr/importer/controls/processed/main';
import {OcrImporterText} from '@/components/ocr/importer/controls/text';
import {OcrRenderImageData} from '@/components/ocr/type';


type Props = {
  text: string,
  image: OcrRenderImageData,
  onConfirm: () => void,
  disableConfirm?: boolean,
};

export const OcrImporterControls = ({text, image, onConfirm, disableConfirm}: Props) => {
  const processed = React.useMemo(() => {
    const canvas = image.processedCanvasRef.current;

    if (!canvas) {
      return null;
    }

    return canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height);
  }, [image.processedCanvasRef]);

  return (
    <Flex direction="row" className="justify-end gap-1.5">
      <OcrImporterImagePreview image={image.raw}/>
      <OcrImporterProcessedImage processed={processed}/>
      <OcrImporterText text={text}/>
      <OcrImporterConfirm onClick={onConfirm} disabled={disableConfirm}/>
    </Flex>
  );
};
