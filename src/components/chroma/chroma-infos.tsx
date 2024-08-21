import PatchNotesViewer from './sections/patch-notes-viewer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info, Github, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <DialogFooter className='flex flex-row items-center justify-center'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href='https://github.com/reeves-48777'>
              <Button
                size='icon'
                variant='ghost'
              >
                <Github />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent className='text-sm'>
            <p>Github account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href='#'
              aria-disabled='true'
            >
              <Button
                size='icon'
                variant='ghost'
                disabled
              >
                <Globe />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent className='text-sm'>
            <p>Portfolio (coming soon)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DialogFooter>
  );
};

const Content = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>Patch Notes</DialogTitle>
        <DialogDescription>
          See what changed through the versions
        </DialogDescription>
      </DialogHeader>
      <PatchNotesViewer />
      <Footer />
    </>
  );
};

export default function ChromaInfos() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
        >
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
