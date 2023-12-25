import React from 'react';

import {createWorker, OEM} from 'tesseract.js';

import {ocrLocaleToTesseract} from '@/components/ocr/const';
import {OcrSettings, OcrState, UseOcrReturn} from '@/components/ocr/type';
import {ocrThresholdImage} from '@/components/ocr/utils';
import {useGatedUpdateState} from '@/hooks/gatedUpdate';
import {getCanvas2dContext} from '@/utils/ocr/canvas';


type UseOcrOpts = {
  settings: OcrSettings,
  whitelistChars: string,
  onError: (message: string) => void,
};

export const useOcr = ({
  settings,
  whitelistChars,
  onError,
}: UseOcrOpts): UseOcrReturn => {
  const {
    state,
    setState,
    setStateGated,
  } = useGatedUpdateState<OcrState>({
    gateMs: 250,
    initial: {
      error: null,
      status: 'ready',
      progress: 0,
      text: null,
    },
  });

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const runOcr = React.useCallback(async () => {
    const image = imageRef.current;
    if (!image) {
      onError('No image ref available');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) {
      onError('No canvas ref available');
      return;
    }

    const ctx = getCanvas2dContext(canvas);
    if (!ctx) {
      onError('No canvas 2D context available');
      return;
    }

    if (!image.width || !image.height) {
      onError('Image is 0 dimension for either width or height');
      return;
    }

    const {locale, tolerance} = settings;

    setState({
      error: null,
      status: 'thresholding',
      progress: 0,
      text: null,
    });
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(imageRef.current, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const processedImage = ocrThresholdImage({imageData, tolerance});
    ctx.putImageData(processedImage, 0, 0);

    setState({
      error: null,
      status: 'loadingOcr',
      progress: 0,
      text: null,
    });
    const tesseractLang = ocrLocaleToTesseract[locale];
    const worker = await createWorker(
      tesseractLang,
      OEM.DEFAULT,
      {
        logger: ({progress, status}) => {
          if (status === 'recognizing text') {
            setStateGated({
              error: null,
              status: 'recognizing',
              progress: progress * 100,
              text: null,
            });
          } else {
            setState({
              error: null,
              status: 'loadingOcr',
              progress: 0,
              text: null,
            });
          }
        },
        errorHandler: (error) => {
          console.error('OCR Error', error);
          setState({
            error: JSON.stringify(error),
            status: 'error',
            progress: 100,
            text: null,
          });
        },
      },
    );
    await worker.setParameters({
      // 'S' could be mistakenly recognized as `$` in JP
      // 'S' could be mistakenly recognized as `§` in EN
      // @ts-ignore
      tessedit_char_blacklist: '$§',
      tessedit_char_whitelist: whitelistChars,
    });

    setState({
      error: null,
      status: 'recognizing',
      progress: 0,
      text: null,
    });
    const {data: {text}} = await worker.recognize(canvasRef.current.toDataURL('image/jpeg'));

    setState({
      error: null,
      status: 'completed',
      progress: 100,
      text,
    });
    await worker.terminate();
  }, [settings, whitelistChars]);

  return {state, canvasRef, imageRef, runOcr};
};
