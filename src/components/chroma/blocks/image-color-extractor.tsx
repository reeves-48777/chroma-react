import { Button } from '@/components/ui/button';
import InputIcon from '@/components/ui/input-icon';
import { Label } from '@/components/ui/label';
import { useColors } from '@/hooks/colors';
import useChromaStore from '@/stores/chroma';
import init, { extract_palette } from '@wasm/chroma_wasm';
import { useState, useEffect, MouseEventHandler } from 'react';

export default function ImageColorExtractor() {
  const [wasmReady, setWasmReady] = useState(false);
  const { rgbToHex } = useColors();

  const imageFile = useChromaStore((state) => state.imageFile);
  const setImageFile = useChromaStore((state) => state.setImageFile);
  const setColors = useChromaStore((state) => state.setColors);
  const settings = useChromaStore((state) => state.settings);

  const handleImageChange = (file: File | null) => setImageFile(file);

  useEffect(() => {
    (async () => {
      await init();
      setWasmReady(true);
    })();
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!wasmReady) {
      console.log('Wasm module not yet ready');
    } else {
      const fileReader = new FileReader();

      fileReader.onload = async (e: ProgressEvent<FileReader>) => {
        const ab = e.target?.result as ArrayBuffer;
        const extracted_colors = extract_palette(
          new Uint8Array(ab),
          settings.n_colors,
          settings.algorithm
        ).map((c: { r: number; g: number; b: number }) => rgbToHex(c));
        setColors(extracted_colors);
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
}
