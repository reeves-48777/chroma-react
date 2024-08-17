import Palette from '@/components/chroma/palette';
import PaletteCommands from '@/components/chroma/palette-commands';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useUIStore from '@/stores/ui';

export default function ChromaContent() {
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  return (
    <div
      className={cn(
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
  );
}
