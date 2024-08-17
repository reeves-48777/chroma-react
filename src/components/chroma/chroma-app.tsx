// import ChromaInfos from './chroma-infos';
import Palette from './palette';
import PaletteCommands from './palette-commands';
import ImageExtractor from './sections/image-extractor';
import { ThemeSwitcher } from './theme';
import chromaLogo from '@/assets/img/rainbow.webp';
import ChromaContext from '@/components/chroma/chroma-context';
import ChromaMenu from '@/components/chroma/chroma-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import useUIStore from '@/stores/ui';
import { Settings } from 'lucide-react';
import { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';

export function ChromaApp() {
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  const menu = useUIStore(
    (state) =>
      state.menu ?? {
        name: 'Image Extractor',
        desc: 'Extract palette from image',
        component: <ImageExtractor />,
      }
  );

  return (
    <div className='grid h-screen w-full grid-cols-[4rem_1fr] grid-rows-[4rem_1fr_4rem] md:grid-rows-[4rem_1fr]'>
      <div className='border-b md:border-r p-2 sticky top-0 left-0 bg-background z-10'>
        <img
          className='rounded-lg size-12'
          src={chromaLogo}
          alt='Chroma'
        />
      </div>
      <header className='sticky top-0 z-10 flex justify-between items-center gap-1 border-b bg-background px-4'>
        <h1 className='text-xl font-semibold tracking-widest uppercase'>
          Chroma
        </h1>
        <div className='flex gap-4 items-center'>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden bg-muted/50 rounded-lg'
              >
                <Settings className='size-4' />
                <span className='sr-only'>Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className='max-h-[80vh] p-4'>
              <DrawerHeader>
                <DrawerTitle>{menu.name}</DrawerTitle>
                <DrawerDescription>{menu.desc}</DrawerDescription>
              </DrawerHeader>
              <ScrollArea className='h-[48rem] pr-4'>
                {menu.component}
              </ScrollArea>
            </DrawerContent>
          </Drawer>
          {/* <ChromaInfos /> */}
          <ThemeSwitcher />
        </div>
      </header>
      <aside className='z-20 h-full w-full hidden md:flex items-center flex-col border-r'>
        <ChromaMenu />
      </aside>
      <footer className='row-start-3 col-span-2 md:hidden border-t flex items-center justify-center'>
        <ChromaMenu />
      </footer>
      <main className='grid flex-1 gap-4 overflow-auto p-4 col-span-2 md:col-span-1 md:grid-cols-2 lg:grid-cols-3'>
        <ChromaContext visible={isContextVisible}>
          <Suspense fallback={<p>Loading...</p>}>{menu.component}</Suspense>
        </ChromaContext>
        <div
          className={twMerge(
            'relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 items-center justify-center',
            isContextVisible
              ? 'lg:col-span-2 md:col-span-1'
              : 'lg:col-span-3 md:col-span-2'
          )}
        >
          <Badge
            variant='outline'
            className='absolute right-3 top-3'
          >
            Palette
          </Badge>
          <Palette />
          <div className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring mt-4 p-4 flex items-center'>
            <PaletteCommands className='w-full' />
          </div>
        </div>
      </main>
    </div>
  );
}
