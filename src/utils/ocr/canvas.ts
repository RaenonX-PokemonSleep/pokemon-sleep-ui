import {Nullable} from '@/utils/type';


export const getCanvas2dContext = (
  canvas: Nullable<HTMLCanvasElement>,
): CanvasRenderingContext2D | null => {
  if (!canvas) {
    return null;
  }

  return canvas.getContext('2d', {willReadFrequently: true});
};
