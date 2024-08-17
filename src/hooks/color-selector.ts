import { useColors } from '@/hooks/colors';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useColorSelector = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { toggleColor } = useColors();

  const colorContainerRef = useRef<HTMLDivElement>(null);
  const activeCheckboxes = useRef<Set<string>>(new Set());

  const handleStart = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      setIsDragActive(true);
      activeCheckboxes.current.clear();
    },
    [setIsDragActive, activeCheckboxes]
  );

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragActive || !colorContainerRef.current) return;

      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        return;
      }

      const target = document.elementFromPoint(clientX, clientY);

      if (
        target &&
        target instanceof HTMLElement &&
        target.dataset.colorValue
      ) {
        const colorValue = target.dataset.colorValue;

        if (!activeCheckboxes.current.has(colorValue)) {
          toggleColor(colorValue);
          activeCheckboxes.current.add(colorValue);
        }
      }
    },
    [isDragActive, activeCheckboxes, toggleColor]
  );

  const handleEnd = useCallback(() => {
    setIsDragActive(false);
  }, [setIsDragActive]);

  useEffect(() => {
    const colorContainer = colorContainerRef.current;
    if (!colorContainer) return;

    // mouse
    colorContainer.addEventListener('mousedown', handleStart);
    colorContainer.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // tactile
    colorContainer.addEventListener('touchstart', handleStart, {
      passive: false,
    });
    colorContainer.addEventListener('touchmove', handleMove, {
      passive: false,
    });
    document.addEventListener('touchend', handleEnd);

    return () => {
      // mouse
      colorContainer.removeEventListener('mousedown', handleStart);
      colorContainer.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);

      // tactile
      colorContainer.removeEventListener('touchstart', handleStart);
      colorContainer.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [colorContainerRef, isDragActive, handleMove, handleEnd, handleStart]);

  return {
    colorContainerRef,
    handleMove,
    toggleColor,
  };
};
