import ColorCheckbox from './color-checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useChromaStore from '@/stores/chroma';
import { useDrag } from '@use-gesture/react';
import { Lock, LockOpen, Plus } from 'lucide-react';
import { MouseEventHandler, useRef, useState } from 'react';

export default function ColorSelector() {
  const colors = useChromaStore((state) => state.colors);
  const noColors = useChromaStore((state) => state.colors.length === 0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const setPalette = useChromaStore((state) => state.setPalette);
  const toggledColors = useRef<Set<string>>(new Set());
  const isDragging = useRef(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleToggleColor = (color: string) => {
    if (setSelectedColors) {
      setSelectedColors((previousState: string[]) => {
        return previousState.includes(color)
          ? previousState.filter((c) => c !== color)
          : [...previousState, color];
      });
    }
  };

  const toggleLock: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsLocked(!isLocked);
  };

  const handleApplyClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setPalette(selectedColors);
  };

  const bind = useDrag(
    ({ down, event }) => {
      if (down && !isLocked) {
        const clientX =
          (event as MouseEvent).clientX ||
          ((event as TouchEvent).touches &&
            (event as TouchEvent).touches[0].clientX);
        const clientY =
          (event as MouseEvent).clientY ||
          ((event as TouchEvent).touches &&
            (event as TouchEvent).touches[0].clientY);

        if (clientX !== undefined && clientY !== undefined) {
          const target = document.elementFromPoint(clientX, clientY);

          if (target && target instanceof HTMLElement && target.dataset.color) {
            const color = target.dataset.color;
            if (color && !toggledColors.current.has(color)) {
              handleToggleColor(color);
              toggledColors.current.add(color);
            }
          }
        }
      } else {
        toggledColors.current.clear();
      }
    },
    { filterTaps: true, axis: 'lock' }
  );

  const handleClick = (color: string) => {
    if (!isDragging.current && !isLocked) {
      handleToggleColor(color);
    }
  };

  if (noColors) return;
  return (
    <>
      <Label htmlFor='color-selector'>Select colors</Label>
      <div
        id='color-selector'
        className='flex gap-4 items-center justify-center'
        style={{ touchAction: 'none' }}
        {...bind()}
      >
        <Button
          size='icon'
          variant={isLocked ? 'secondary' : 'ghost'}
          onClick={toggleLock}
        >
          {isLocked ? <Lock size={16} /> : <LockOpen size={16} />}
        </Button>
        {colors.map((color) => (
          <div key={color}>
            <ColorCheckbox
              color={color}
              isSelected={selectedColors.includes(color)}
              onToggle={() => handleClick(color)}
            />
          </div>
        ))}

        <Button
          size='icon'
          variant='secondary'
          onClick={handleApplyClick}
        >
          <Plus size={16} />
        </Button>
      </div>
    </>
  );
}
