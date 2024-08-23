import ColorSelector from '../blocks/color-selector';
import ImageColorExtractor from '@/components/chroma/blocks/image-color-extractor';

export default function ImageExtractor() {
  // const [nColors, setNColors] = useState<number>(5);
  return (
    <>
      <form className='grid w-full items-start gap-6'>
        <ImageColorExtractor />
        <ColorSelector />
      </form>
    </>
  );
}
