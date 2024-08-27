import DragNDropPalette from './drag-n-drop-palette';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';
import { usePalette } from '@/hooks/palette';
import { cn } from '@/lib/utils';
import useUIStore from '@/stores/ui';

export default function PaletteViewer() {
  const { capturePaletteAsImage } = usePalette();
  const orientation = useUIStore((state) => state.paletteOrientation);

  return (
    <ContextMenu>
      <ContextMenuTrigger className='flex w-full h-full items-center justify-center'>
        <div
          className={cn(
            'border light:border-muted-foreground/40 border-dashed items-center justify-center',
            orientation === 'landscape' ? 'w-full h-40' : 'w-40 h-full'
          )}
        >
          <DragNDropPalette />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-64'>
        <ContextMenuItem inset>Back</ContextMenuItem>
        <ContextMenuItem
          inset
          onSelect={() => {
            capturePaletteAsImage('palette-container');
          }}
        >
          Download palette
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
