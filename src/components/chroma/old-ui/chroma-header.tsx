import ChromaInfos from '@/components/chroma/old-ui/chroma-infos';
import { ThemeSelector } from '@/components/chroma/old-ui/theme';

export default function ChromaHeader() {
  return (
    <header className='sticky top-0 z-10 flex justify-between items-center gap-1 border-b bg-background px-4'>
      <h1 className='text-xl font-semibold tracking-widest uppercase'>
        Chroma
      </h1>
      <div className='flex gap-4 items-center'>
        <ChromaInfos />
        <ThemeSelector />
      </div>
    </header>
  );
}
