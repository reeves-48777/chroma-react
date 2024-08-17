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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Note } from '@/core';
import usePatchNotes from '@/hooks/patch-notes';
import { Info, Github, Globe, CircleX } from 'lucide-react';
import Markdown from 'react-markdown';

const Footer = () => {
  return (
    <DialogFooter className='flex items-center justify-center'>
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
  const { patchNotes, isLoading, isError } = usePatchNotes();

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-2xl'>Patch Notes</DialogTitle>
        <DialogDescription>
          See what changed through the versions
        </DialogDescription>
        {isError && (
          <Card className='border border-red-400 dark:border-red-700 text-red-400 dark:text-red-700 rounded-lg'>
            <CardHeader>
              <CardTitle>Oops</CardTitle>
              <CardDescription className='text-red-400 dark:text-red-700'>
                Something went wrong
              </CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <CircleX size={128} />
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
                      <span>{note.version}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Markdown className='prose prose-sm text-muted-foreground prose-h1:text-muted-foreground'>
                        {note.text}
                      </Markdown>
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
