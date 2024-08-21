import useChromaStore from '@/stores/chroma';
import html2canvas from 'html2canvas';

export const usePalette = () => {
  const isPaletteEmpty = useChromaStore(
    (state) => state.palette.length === 0 || !state.palette
  );

  const capturePaletteAsImage = async (
    elementId: string,
    filename = `palette-${Date.now()}.png`
  ) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    try {
      const canvas = await html2canvas(element);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('failed to capture the palette : ', error);
    }
  };

  return {
    isPaletteEmpty,
    capturePaletteAsImage,
  };
};
