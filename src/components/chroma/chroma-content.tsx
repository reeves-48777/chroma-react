// import DragNDropPalette from './drag-n-drop-palette';
import PaletteCommands from '@/components/chroma/palette-commands';
import PaletteViewer from '@/components/chroma/palette-viewer';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useUIStore from '@/stores/ui';

export default function ChromaContent() {
  const isContextVisible = useUIStore((state) => state.isContextVisible);
  return (
    <div
      className={cn(
        'relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/30 px-6 pt-12 pb-6 gap-12 items-center justify-center',
        isContextVisible
          ? 'lg:col-span-2 md:col-span-1'
          : 'lg:col-span-3 md:col-span-2'
      )}
    >
      <Badge
        variant='outline'
        className='absolute right-3 top-3'
      >
        Palette editor
      </Badge>
      <PaletteViewer />
      <div className='relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 p-4 flex items-center'>
        <PaletteCommands className='w-full' />
      </div>
    </div>
  );
}
