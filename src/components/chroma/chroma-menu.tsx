import { Button } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { useDeviceType } from '@/hooks/utils';
import useUIStore from '@/stores/ui';
import { Image, Settings2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { lazy } from 'react';

function ChromaContextManager() {
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  const toggleContextVisibility = useUIStore(
    (state) => state.toggleContextVisibilty
  );

  const tooltip = isContextVisible ? 'Close left panel' : 'Open left panel';
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-lg bg-muted'
              aria-label={tooltip}
              onClick={toggleContextVisibility}
            >
              {isContextVisible ? <PanelLeftClose /> : <PanelLeftOpen />}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side='right'
            sideOffset={5}
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

type MenuProps = {
  className?: string;
};

const ImageExtractor = lazy(
  () => import('@/components/chroma/sections/image-extractor')
);

const ExtractorSettings = lazy(
  () => import('@/components/chroma/sections/extractor-settings')
);

const Menu = ({ className = '' }: MenuProps) => {
  const selectMenu = useUIStore((state) => state.selectMenu);

  const isContextVisible = useUIStore((state) => state.isContextVisible);
  const setIsContextVisible = useUIStore((state) => state.setIsContextVisible);
  const toggleContextVisibility = useUIStore(
    (state) => state.toggleContextVisibilty
  );

  const { isMobileDevice } = useDeviceType();

  return (
    <>
      <nav className={'flex md:grid gap-8 md:gap-2 p-2 ' + className}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-lg'
                aria-label='Extract palette from image'
                onClick={() => {
                  selectMenu(ImageExtractor);
                  if (isMobileDevice) {
                    toggleContextVisibility();
                  } else {
                    if (!isContextVisible) {
                      setIsContextVisible(true);
                    }
                  }
                }}
              >
                <Image className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              sideOffset={5}
            >
              Extract palette from image
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-lg'
                aria-label='Settings'
                onClick={() => selectMenu(ExtractorSettings)}
              >
                <Settings2 className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              sideOffset={5}
            >
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className='mt-auto gap-1 p-2 hidden md:grid'>
        <ChromaContextManager />
      </nav>
    </>
  );
};

export default function ChromaMenu() {
  return (
    <>
      <aside className='z-20 h-full w-full hidden md:flex items-center flex-col'>
        <Menu />
      </aside>
      <footer className='row-start-3 col-span-2 md:hidden flex items-center justify-center border-t'>
        <Menu />
      </footer>
    </>
  );
}
