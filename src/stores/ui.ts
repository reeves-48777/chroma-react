import { lazy, FunctionComponent } from 'react';
import { create } from 'zustand';

const ImageExtractor = lazy(
  () => import('@/components/chroma/sections/image-extractor')
);

type OrientationType = 'portrait' | 'landscape';

type Store = {
  isContextVisible: boolean;
  toggleContextVisibilty: () => void;
  setIsContextVisible: (visible: boolean) => void;

  paletteOrientation: OrientationType;
  setPaletteOrientation: (orientation: OrientationType) => void;
  togglePaletteOrientation: () => void;

  menu: FunctionComponent;
  selectMenu: (menu: FunctionComponent) => void;
};

const useUIStore = create<Store>((set) => ({
  isContextVisible: true,
  toggleContextVisibilty: () =>
    set((state) => ({ isContextVisible: !state.isContextVisible })),
  setIsContextVisible: (visible: boolean) =>
    set(() => ({ isContextVisible: visible })),
  paletteOrientation: 'landscape',
  setPaletteOrientation: (orientation: OrientationType) =>
    set(() => ({ paletteOrientation: orientation })),
  togglePaletteOrientation: () =>
    set((state) => ({
      paletteOrientation:
        state.paletteOrientation === 'landscape' ? 'portrait' : 'landscape',
    })),

  menu: ImageExtractor,
  selectMenu: (menu: FunctionComponent) => set(() => ({ menu })),
}));

export default useUIStore;
