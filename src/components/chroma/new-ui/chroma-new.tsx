// import ChromaLogo from '@/assets/img/chroma.webp';

import OverlayedMenuLayout from './overlayed-menu-layout';
import { useDeviceType } from '@/hooks/utils';
import { cn } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';

export default function ChromaNew() {
  const { isMobileDevice, isPortraitOriented } = useDeviceType();
  if (isMobileDevice && isPortraitOriented) {
    return (
      <div className='w-screen h-screen flex flex-col items-center justify-evenly'>
        <RefreshCcw
          size={128}
          className='animate-in fade-in spin-in-90 repeat-infinite delay-1000 duration-1000 text-muted'
        />
        <p className='text-balance text-2xl font-bold text-muted-foreground w-3/5'>
          Hey! I <s>recommend</s> force you tu put your device in landscape mode
          so you can have a better experience
        </p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        'w-screen h-screen flex gap-4 relative',
        !isMobileDevice && 'px-2 py-3'
      )}
    >
      <OverlayedMenuLayout />
    </div>
  );
}
