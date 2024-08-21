import { useEffect, useState, useRef } from 'react';

type DeviceType = 'mobile' | 'desktop';

export const useUI = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(
    window.matchMedia('(max-width: 767px)').matches
  );

  const deviceType = useRef<DeviceType>(isMobileDevice ? 'mobile' : 'desktop');

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.matchMedia('(max-width: 767px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobileDevice,
    deviceType,
  };
};
