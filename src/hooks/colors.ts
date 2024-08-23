import { useCallback } from 'react';

export const useColors = () => {
  const toHexaStringPadded = useCallback((decimalValue: number) => {
    return decimalValue.toString(16).padStart(2, '0');
  }, []);

  const rgbToHex = useCallback(
    (color: { r: number; g: number; b: number }) => {
      return `#${toHexaStringPadded(color.r)}${toHexaStringPadded(
        color.g
      )}${toHexaStringPadded(color.b)}`;
    },
    [toHexaStringPadded]
  );

  const getColorLuminance = (hexColor: string) => {
    const rgb = hexColor
      .replace(/^#/, '')
      .match(/.{2}/g)
      ?.map((colorChannel) => parseInt(colorChannel, 16) / 255);

    const a = rgb?.map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );

    if (a === undefined) {
      throw new Error('Cannot extract luminance from color');
    }
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  return {
    rgbToHex,
    getColorLuminance,
  };
};
