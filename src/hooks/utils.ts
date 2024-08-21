import useUIStore from '@/stores/ui';
import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const setOrientation = useUIStore((state) => state.setPaletteOrientation);
  const setIsContextVisible = useUIStore((state) => state.setIsContextVisible);
  const [isMobileDevice, setIsMobileDevice] = useState(
    window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.matchMedia('(max-width: 767px').matches);
      const aspectRatio = window.innerWidth / window.innerHeight;

      if (isMobileDevice || aspectRatio < 1) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }

      setIsContextVisible(isMobileDevice ? false : true);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileDevice, setOrientation, setIsContextVisible]);

  return {
    isMobileDevice,
  };
};
