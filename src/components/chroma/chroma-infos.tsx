import { Spinner } from '../ui/spinner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Note } from '@/core';
import usePatchNotes from '@/hooks/patch-notes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Info, Github, Globe, CircleX } from 'lucide-react';
import Markdown from 'react-markdown';

const Footer = () => {
  return (
    <DialogFooter className='flex items-center justify-center'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
            >
              <Github />
            </Button>
          </TooltipTrigger>
          <TooltipContent className='text-sm'>Github account</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
            >
              <Globe />
            </Button>
          </TooltipTrigger>
          <TooltipContent className='text-sm'>
            Portfolio (coming soon)
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DialogFooter>
  );
};

const Content = () => {
  // const patchNotes = Array.from({ length: 5 }).map((_, i) => ({
  //   version: `version ${i / 10}`,
  //   text: '# Summary **SHEESH**',
  // }));

  const { patchNotes, isLoading, error } = usePatchNotes();

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>Patch Notes</DialogTitle>
        <DialogDescription>
          See what changed through the versions
        </DialogDescription>
        {error && (
          <Card className='border border-red-400 dark:border-red-700 text-red-400 dark:text-red-700 rounded-lg'>
            <CardHeader>
              <CardTitle>Oops</CardTitle>
              <CardDescription>Something went wrong</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <pre>{error}</pre>
              <CircleX />
            </CardContent>
          </Card>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='text-muted-foreground'>
            <ScrollArea className='h-96'>
              {patchNotes.map((note: Note) => (
                <Accordion
                  key={note.version}
                  type='single'
                  collapsible
                >
                  <AccordionItem
                    value={note.version}
                    className='w-[calc(100%-1rem)]'
                  >
                    <AccordionTrigger className='font-bold'>
                      <span className='capitalize'>{note.version}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Markdown>{note.text}</Markdown>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </ScrollArea>
          </div>
        )}
      </DialogHeader>
      <Footer />
    </>
  );
};

const ChromaInfos = () => {
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
};

export default ChromaInfos;
