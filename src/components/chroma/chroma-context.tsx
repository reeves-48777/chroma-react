import { useDeviceType } from '@/hooks/utils';
import { cn } from '@/lib/utils';
import useUIStore from '@/stores/ui';
import { ReactNode } from 'react';

interface ChromaContextProps {
  children: ReactNode;
}

export default function ChromaContext({ children }: ChromaContextProps) {
  const { isMobileDevice } = useDeviceType();
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  return (
    <>
      <div
        className={cn(
          'h-full bg-background',
          isMobileDevice ? 'absolute z-20 w-full' : 'w-96 flex-none',
          !isContextVisible && 'hidden'
        )}
      >
        {children}
      </div>
    </>
  );
}
