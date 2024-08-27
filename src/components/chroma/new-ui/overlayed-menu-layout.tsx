import ChromaInfos from '../old-ui/chroma-infos';
import { ThemeSwitcher } from '../old-ui/theme';
import PaletteWorkspace from './palette-workspace';
import ChromaLogo from '@/assets/img/chroma.webp';

export default function OverlayedMenuLayout() {
  return (
    <div className='fixed inset-0 grid grid-cols-[3.25rem_calc(100vw-3.25rem)] grid-rows-[calc(100vh-3.25rem)_3.25rem] z-50'>
      <div className='flex flex-col row-start-1 col-start-1 items-center justify-end gap-4 py-2 bg-muted/20'>
        <img
          src={ChromaLogo}
          className='rounded-lg size-10'
        />
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <ChromaInfos />
        <ThemeSwitcher />
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
      </div>
      <div className='flex row-start-2 col-start-1 col-span-2 gap-4 items-center px-2 bg-muted/20'>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-muted border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
        <div className='size-10 bg-background border border-dashed rounded-lg'></div>
      </div>
      <div className='row-start-1 col-start-2'>
        <PaletteWorkspace />
      </div>
    </div>
  );
}
