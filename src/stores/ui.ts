import { lazy, FunctionComponent } from 'react';
import { create } from 'zustand';

const ImageExtractor = lazy(
  () => import('@/components/chroma/sections/image-extractor')
);

type OrientationType = 'horizontal' | 'vertical';

type Store = {
  isContextVisible: boolean;
  toggleContextVisibilty: () => void;
  setIsContextVisible: (visible: boolean) => void;

  menu: FunctionComponent;
  selectMenu: (menu: FunctionComponent) => void;

  paletteOrientation: OrientationType;
  setPaletteOrientation: (orientation: OrientationType) => void;
};

const useUIStore = create<Store>((set) => ({
  isContextVisible: true,
  toggleContextVisibilty: () =>
    set((state) => ({ isContextVisible: !state.isContextVisible })),
  setIsContextVisible: (visible: boolean) =>
    set(() => ({ isContextVisible: visible })),
  menu: ImageExtractor,
  selectMenu: (menu: FunctionComponent) => set(() => ({ menu })),
  paletteOrientation: 'horizontal',
  setPaletteOrientation: (orientation: OrientationType) =>
    set(() => ({ paletteOrientation: orientation })),
}));

export default useUIStore;
