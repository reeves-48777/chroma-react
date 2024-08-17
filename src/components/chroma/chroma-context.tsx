import { cn } from '@/lib/utils';
import useUIStore from '@/stores/ui';
import { ReactNode } from 'react';

interface ChromaContextProps {
  visible?: boolean;
  children: ReactNode;
}

export default function ChromaContext({ children }: ChromaContextProps) {
  const isVisible = useUIStore((state) => state.isContextVisible);
  return (
    <>
      <div
        className={cn(
          'relative hidden flex-col items-start gap-8',
          isVisible && 'md:flex'
        )}
      >
        {children}
      </div>
    </>
  );
}
