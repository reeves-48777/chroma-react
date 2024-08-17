import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import InputIcon from '@/components/ui/input-icon';
import { Label } from '@/components/ui/label';
import { useColors } from '@/hooks/colors';
import { cn } from '@/lib/utils';
import useChromaStore from '@/stores/chroma';
import init, { extract_palette } from '@wasm/chroma_wasm';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const ImageSelector = () => {
  const [wasmReady, setWasmReady] = useState(false);
  const { rgbToHex } = useColors();

  const imageFile = useChromaStore((state) => state.imageFile);
  const setImageFile = useChromaStore((state) => state.setImageFile);
  const setColors = useChromaStore((state) => state.setColors);

  const handleImageChange = (file: File | null) => setImageFile(file);

  useEffect(() => {
    const loadWasm = async () => {
      await init();
      setWasmReady(true);
    };
    loadWasm();
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!wasmReady) {
      console.log('Wasm module not yet ready');
    } else {
      const fileReader = new FileReader();

      fileReader.onload = async (e: ProgressEvent<FileReader>) => {
        const ab = e.target?.result as ArrayBuffer;
        const extracted_colors = extract_palette(new Uint8Array(ab), 5).map(
          (c: { r: number; g: number; b: number }) => rgbToHex(c)
        );
        setColors(
          extracted_colors.map((color: string) => ({
            value: color,
            selected: false,
          }))
        );
      };
      fileReader.readAsArrayBuffer(imageFile!);
    }
  };

  return (
    <fieldset className='grid gap-6 rounded-lg border p-4'>
      <legend className='-ml-1 px-1 text-sm font-medium text-wrap'>
        Extract palette from image
      </legend>
      <div className='grid gap-3'>
        <Label htmlFor='imageFile'>Image</Label>
        <InputIcon onFileChange={handleImageChange} />
        {imageFile && (
          <fieldset className='py-2'>
            <legend className='-ml-1 px-2 text-sm font-medium'>
              Image preview
            </legend>
            <figure className='overflow-hidden rounded-lg'>
              <img
                src={URL.createObjectURL(imageFile)}
                alt={imageFile.name}
              />
            </figure>
          </fieldset>
        )}
      </div>
      <div className='grid gap-3'>
        <Button
          disabled={!imageFile}
          onClick={handleClick}
        >
          Extract colors
        </Button>
      </div>
    </fieldset>
  );
};

const ColorSelector = () => {
  const [isDrag, setDrag] = useState(false);
  const { toggleColor } = useColors();
  const colorContainerRef = useRef<HTMLDivElement>(null);
  const activeCheckboxes = useRef<Set<string>>(new Set());

  const colors = useChromaStore((state) => state.colors);
  const noColors = colors.length === 0;
  const setPalette = useChromaStore((state) => state.setPalette);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPalette(
      colors.filter((color) => color.selected).map((color) => color.value)
    );
  };

  const handleStart = (event: MouseEvent | TouchEvent) => {
    setDrag(true);
    activeCheckboxes.current.clear();

    event.preventDefault();
  };

  const handleMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDrag || !colorContainerRef.current) return;

      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        return;
      }

      const target = document.elementFromPoint(clientX, clientY);

      if (
        target &&
        target instanceof HTMLElement &&
        target.dataset.colorValue
      ) {
        const colorValue = target.dataset.colorValue;

        if (!activeCheckboxes.current.has(colorValue)) {
          toggleColor(colorValue);
          activeCheckboxes.current.add(colorValue);
        }
      }
    },
    [isDrag, toggleColor]
  );

  const handleEnd = () => {
    setDrag(false);
  };

  useEffect(() => {
    const colorContainer = colorContainerRef.current;
    if (!colorContainer) return;

    // mouse
    colorContainer.addEventListener('mousedown', handleStart);
    colorContainer.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // tactile
    colorContainer.addEventListener('touchstart', handleStart, {
      passive: false,
    });
    colorContainer.addEventListener('touchmove', handleMove, {
      passive: false,
    });
    document.addEventListener('touchend', handleEnd);

    return () => {
      // mouse
      colorContainer.removeEventListener('mousedown', handleStart);
      colorContainer.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);

      // tactile
      colorContainer.removeEventListener('touchstart', handleStart);
      colorContainer.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDrag, handleMove]);

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
};

export default function ImageExtractor() {
  // const [nColors, setNColors] = useState<number>(5);
  return (
    <>
      <form className='grid w-full items-start gap-6'>
        <ImageSelector />
        <ColorSelector />
      </form>
    </>
  );
}
