import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useColorSelector } from '@/hooks/color-selector';
import { cn } from '@/lib/utils';
import useChromaStore from '@/stores/chroma';
import { MouseEventHandler } from 'react';

export default function ColorSelector() {
  const { colorContainerRef, handleMove, toggleColor } = useColorSelector();

  const colors = useChromaStore((state) => state.colors);
  const noColors = colors.length === 0;
  const setPalette = useChromaStore((state) => state.setPalette);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPalette(
      colors.filter((color) => color.selected).map((color) => color.value)
    );
  };

  return (
    <fieldset
      className={cn(
        'grid gap-6 rounded-lg border p-4',
        noColors && 'text-muted',
        noColors && 'border-dashed'
      )}
    >
      <legend className='-ml-1 px-1 text-sm font-medium'>
        Color selection
      </legend>
      <div
        className='flex gap-3'
        ref={colorContainerRef}
      >
        {colors.map((color) => {
          return (
            <Checkbox
              key={color.value}
              color={color.value}
              checked={color.selected}
              onCheckedChange={() => {
                toggleColor(color.value);
              }}
              onMouseEnter={() => {
                handleMove;
              }}
              onTouchMove={() => {
                handleMove;
              }}
              onClick={() => {
                toggleColor(color.value);
              }}
              data-color-value={color.value}
            />
          );
        })}
      </div>
      <div className='grid gap-3'>
        <Button
          className={cn(noColors && 'border border-dashed')}
          variant={noColors ? 'ghost' : 'default'}
          disabled={noColors}
          onClick={handleClick}
        >
          Use those colors
        </Button>
      </div>
    </fieldset>
  );
}
