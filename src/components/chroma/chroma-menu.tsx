import { Button } from '@/components/ui/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import useUIStore from '@/stores/ui';
import { Image, Settings2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { lazy } from 'react';

function ChromaContextManager() {
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  const toggleContextVisibility = useUIStore(
    (state) => state.toggleContextVisibilty
  );

  const icon = isContextVisible ? <PanelLeftClose /> : <PanelLeftOpen />;
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
              {icon}
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

export default function ChromaMenu({ className = '' }: MenuProps) {
  const selectMenu = useUIStore((state) => state.selectMenu);
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  const setIsContextVisible = useUIStore((state) => state.setIsContextVisible);

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
                  selectMenu({
                    name: 'Image Extractor',
                    desc: 'Extract colors from image',
                    component: <ImageExtractor />,
                  });
                  if (!isContextVisible) {
                    setIsContextVisible(true);
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
                onClick={() =>
                  selectMenu({
                    name: 'Settings',
                    desc: 'Change the settings of the extraction algorithm',
                    component: <ExtractorSettings />,
                  })
                }
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
}
