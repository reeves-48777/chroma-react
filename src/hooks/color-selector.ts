import { useColors } from '@/hooks/colors';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useColorSelector = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { toggleColor } = useColors();

  const colorContainerRef = useRef<HTMLDivElement>(null);
  const activeCheckboxes = useRef<Set<string>>(new Set());
  const isMoving = useRef(false);

  const handleStart = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (event instanceof TouchEvent) {
        event.preventDefault();
      }
      setIsDragActive(true);
      activeCheckboxes.current.clear();
    },
    [setIsDragActive, activeCheckboxes]
  );

  const handleTarget = useCallback(
    (target: Element | null) => {
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
    [toggleColor, activeCheckboxes]
  );

  // a naive try and fail on optimisation
  // const handleMouseMove = useCallback(
  //   (event: MouseEvent) => {
  //     if (!isDragActive || !colorContainerRef.current || isMoving.current) {
  //       return;
  //     }
  //     console.log('aled');

  //     isMoving.current = true;
  //     requestAnimationFrame(() => {
  //       const clientX = event.clientX;
  //       const clientY = event.clientY;

  //       if (clientX !== undefined && clientY !== undefined) {
  //         const target = document.elementFromPoint(clientX, clientY);
  //         handleTarget(target);
  //       }

  //       isMoving.current = false;
  //     });
  //   },
  //   [isDragActive, colorContainerRef, isMoving, handleTarget]
  // );

  // const handleTouchMove = useCallback(
  //   (event: TouchEvent) => {
  //     if (!isDragActive || !colorContainerRef.current || isMoving.current) {
  //       return;
  //     }

  //     isMoving.current = true;
  //     requestAnimationFrame(() => {
  //       const touch = event.touches[0];
  //       console.log(touch);
  //       const clientX = touch.clientX;
  //       const clientY = touch.clientY;

  //       if (clientX !== undefined && clientY !== undefined) {
  //         const target = document.elementFromPoint(clientX, clientY);
  //         handleTarget(target);
  //       }

  //       isMoving.current = false;
  //     });
  //   },
  //   [isDragActive, colorContainerRef, isMoving, handleTarget]
  // );

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDragActive || !colorContainerRef.current || isMoving.current)
        return;

      isMoving.current = true;
      requestAnimationFrame(() => {
        let clientX: number | undefined, clientY: number | undefined;

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

        if (clientX !== undefined && clientY !== undefined) {
          const target = document.elementFromPoint(clientX, clientY);
          handleTarget(target);
        }

        isMoving.current = false;
      });
    },
    [isDragActive, handleTarget]
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
