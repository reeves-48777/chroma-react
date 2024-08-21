import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';
import { useColors } from '@/hooks/colors';
import { usePalette } from '@/hooks/palette';
import { cn } from '@/lib/utils';
import useChromaStore from '@/stores/chroma';
import useUIStore from '@/stores/ui';

const Palette = () => {
  const { getColorLuminance } = useColors();
  const { capturePaletteAsImage } = usePalette();
  const palette = useChromaStore((state) => state.palette);
  const orientation = useUIStore((state) => state.paletteOrientation);

  return (
    <ContextMenu>
      <ContextMenuTrigger className='flex w-full h-full items-center justify-center'>
        <div
          className={cn(
            'border light:border-muted-foreground/40 border-dashed items-center justify-center rounded-lg overflow-hidden',
            orientation === 'landscape' ? 'w-full h-40' : 'w-40 h-full'
          )}
        >
          <div
            id='palette-container'
            className={cn(
              'flex h-full w-full justify-center',
              orientation === 'landscape' ? 'flex-row' : 'flex-col',
              palette.length > 0 ? 'items-stretch' : 'items-center'
            )}
          >
            {palette.length > 0 ? (
              palette.map((color) => (
                <div
                  key={color}
                  className={cn(
                    'grow flex items-stretch justify-center',
                    orientation === 'landscape' ? 'flex-row' : 'flex-col'
                  )}
                >
                  <div
                    className='grow flex items-center justify-center font-semibold'
                    style={{
                      background: color,
                    }}
                  >
                    <span
                      className='font-bold'
                      style={{
                        color: getColorLuminance(color) > 0.5 ? '#000' : '#fff',
                      }}
                    >
                      {color}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span
                className={cn(
                  'text-2xl text-muted-foreground/40 dark:text-muted text-pretty',
                  orientation === 'portrait' && 'writing-mode-vertical-lr'
                )}
              >
                NO PALETTE FOR NOW
              </span>
            )}
          </div>
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
};
export default Palette;
