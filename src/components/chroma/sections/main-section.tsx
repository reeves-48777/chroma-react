import ChromaContent from '@/components/chroma/old-ui/chroma-content';
import ChromaContext from '@/components/chroma/old-ui/chroma-context';
import { Spinner } from '@/components/ui/spinner';
import useUIStore from '@/stores/ui';
import { Suspense } from 'react';

export default function MainSection() {
  const Menu = useUIStore((state) => state.menu);
  return (
    <div className='w-full h-full gap-4 flex relative'>
      <ChromaContext>
        <Suspense
          fallback={
            <Spinner className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
          }
        >
          {<Menu />}
        </Suspense>
      </ChromaContext>
      <div className='flex-1'>
        <ChromaContent />
      </div>
    </div>
  );
}
