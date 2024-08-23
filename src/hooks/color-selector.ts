import { useColors } from '@/hooks/colors';
import { useDrag } from '@use-gesture/react';
import { useCallback, useRef } from 'react';

export const useColorSelector = () => {
  const activeCheckboxes = useRef<Set<string>>(new Set());

  const handleTarget = useCallback((target: Element | null) => {
    if (target && target instanceof HTMLElement && target.dataset.colorValue) {
      const colorValue = target.dataset.colorValue;

      if (!activeCheckboxes.current.has(colorValue)) {
        toggleColor;
      }
    }
  });

  return {
    colorContainerRef,
    handleMove,
    toggleColor,
  };
};
