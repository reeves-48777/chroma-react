import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePalette } from '@/hooks/palette';
import useUIStore from '@/stores/ui';
import { RefreshCw, Download } from 'lucide-react';
import { MouseEventHandler } from 'react';

type PaletteCommandsProps = {
  className?: string;
};

const PaletteCommands = ({ className = '' }: PaletteCommandsProps) => {
  const orientation = useUIStore((state) => state.paletteOrientation);
  const setOrientation = useUIStore((state) => state.setPaletteOrientation);
  const { capturePaletteAsImage } = usePalette();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  const handleRotateClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    handleClick(event);
    orientation === 'vertical'
      ? setOrientation('horizontal')
      : setOrientation('vertical');
  };

  const handleDownloadClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    handleClick(event);
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
