import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { Note } from '@/core';
import usePatchNotes from '@/hooks/patch-notes';
import { CircleX, Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Markdown from 'react-markdown';
import { toast } from 'sonner';

export default function PatchNotesViewer() {
  const { patchNotes, isLoading, isError } = usePatchNotes();

  const handleCopy = () => {
    toast.success('Text copied to clipboard');
  };

  return (
    <>
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
          <ScrollArea className='h-80 md:h-96'>
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
                  <AccordionContent className='relative group'>
                    <CopyToClipboard
                      text={note.text}
                      onCopy={handleCopy}
                    >
                      <Button
                        variant='ghost'
                        className='opacity-100 md:opacity-0 group-hover:opacity-100 absolute top-0 right-3 z-50 transition-opacity will-change-[opacity] duration-150 ease-in-out'
                      >
                        <Copy size={16} />
                      </Button>
                    </CopyToClipboard>
                    <Markdown className='prose prose-sm text-muted-foreground prose-h1:text-muted-foreground prose-blockquote:text-muted-foreground/80 text-start'>
                      {note.text}
                    </Markdown>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </ScrollArea>
        </div>
      )}
    </>
  );
}
