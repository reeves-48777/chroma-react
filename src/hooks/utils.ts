import useUIStore from '@/stores/ui';
import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const setOrientation = useUIStore((state) => state.setPaletteOrientation);
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
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileDevice, setOrientation]);

  return {
    isMobileDevice,
  };
};
