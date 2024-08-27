import MainSection from '../sections/main-section';
import chromaLogo from '@/assets/img/rainbow.webp';
import ChromaHeader from '@/components/chroma/old-ui/chroma-header';
import ChromaMenu from '@/components/chroma/old-ui/chroma-menu';
import { Toaster } from '@/components/ui/sonner';

export function ChromaApp() {
  return (
    <div className='grid h-screen w-full grid-cols-[4rem_1fr] grid-rows-[4rem_1fr_4rem] md:grid-rows-[4rem_1fr]'>
      <div className='p-2 sticky top-0 left-0 bg-background z-10 border-b'>
        <img
          className='rounded-lg size-12'
          src={chromaLogo}
          alt='Chroma'
        />
      </div>
      <ChromaHeader />
      <ChromaMenu />
      <main className='flex w-full gap-4 p-4 overflow-auto col-span-2 md:col-span-1'>
        <MainSection />
      </main>
      <Toaster />
    </div>
  );
}
