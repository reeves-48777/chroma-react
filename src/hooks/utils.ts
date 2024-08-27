import useUIStore from '@/stores/ui';
import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const setPaletteOrientation = useUIStore(
    (state) => state.setPaletteOrientation
  );
  const setIsContextVisible = useUIStore((state) => state.setIsContextVisible);
  const [isMobileDevice, setIsMobileDevice] = useState(
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
      window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
  );
  const [isPortraitOriented, setIsPortrait] = useState(
    window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0
      );
      setIsPortrait(window.innerWidth < window.innerHeight);

      if (isMobileDevice || !isPortraitOriented) {
        setPaletteOrientation('portrait');
      } else {
        setPaletteOrientation('landscape');
      }

      setIsContextVisible(isMobileDevice ? false : true);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [
    isMobileDevice,
    isPortraitOriented,
    setPaletteOrientation,
    setIsContextVisible,
  ]);

  return {
    isMobileDevice,
    isPortraitOriented,
  };
};
