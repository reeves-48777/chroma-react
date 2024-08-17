import chromaLogo from '@/assets/img/rainbow.webp';
import ChromaContent from '@/components/chroma/chroma-content';
import ChromaContext from '@/components/chroma/chroma-context';
import ChromaHeader from '@/components/chroma/chroma-header';
import ChromaMenu from '@/components/chroma/chroma-menu';
import { Spinner } from '@/components/ui/spinner';
import useUIStore from '@/stores/ui';
import { Suspense } from 'react';

export function ChromaApp() {
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  const Menu = useUIStore((state) => state.menu);

  return (
    <div className='grid h-screen w-full grid-cols-[4rem_1fr] grid-rows-[4rem_1fr_4rem] md:grid-rows-[4rem_1fr]'>
      <div className='border-b md:border-r p-2 sticky top-0 left-0 bg-background z-10'>
        <img
          className='rounded-lg size-12'
          src={chromaLogo}
          alt='Chroma'
        />
      </div>
      <ChromaHeader />
      <ChromaMenu />
      <main className='grid flex-1 gap-4 overflow-auto p-4 col-span-2 md:col-span-1 md:grid-cols-2 lg:grid-cols-3'>
        <ChromaContext visible={isContextVisible}>
          <Suspense
            fallback={
              <Spinner className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
            }
          >
            {<Menu />}
          </Suspense>
        </ChromaContext>
        <ChromaContent />
      </main>
    </div>
  );
}
