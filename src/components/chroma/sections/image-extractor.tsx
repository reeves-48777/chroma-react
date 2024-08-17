import ColorSelector from '@/components/chroma/blocks/color-selector';
import ImageSelector from '@/components/chroma/blocks/image-selector';

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
