import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// import { useToast } from '@/components/ui/use-toast';
import { usePalette } from '@/hooks/palette';
import useUIStore from '@/stores/ui';
import { RefreshCw, Download } from 'lucide-react';
// import { TriangleAlert } from 'lucide-react';
import { MouseEventHandler } from 'react';

type PaletteCommandsProps = {
  className?: string;
};

const PaletteCommands = ({ className = '' }: PaletteCommandsProps) => {
  // const { toast } = useToast();
  const toggleOrientation = useUIStore(
    (state) => state.togglePaletteOrientation
  );

  const { isPaletteEmpty, capturePaletteAsImage } = usePalette();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  const handleRotateClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    handleClick(event);
    toggleOrientation();
  };

  const handleDownloadClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    handleClick(event);
    // if (isPaletteEmpty) {
    //   toast({
    //     title: 'Something went wrong :c',
    //     description: (
    //       <div className='flex items-center gap-4'>
    //         You cannot download an empty palette <TriangleAlert />
    //       </div>
    //     ),
    //     className: 'text-red-500',
    //   });
    // } else {
    //   capturePaletteAsImage('palette-container');
    // }
    capturePaletteAsImage('palette-container');
  };

  return (
    <div className={'flex items-center justify-center gap-4 ' + className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className='rounded-lg gap-3'
              onClick={handleRotateClick}
              variant='secondary'
              size='sm'
            >
              <RefreshCw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate palette</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className='rounded-lg gap-3'
              disabled={isPaletteEmpty}
              onClick={handleDownloadClick}
              variant='secondary'
              size='sm'
            >
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download Palette</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PaletteCommands;
