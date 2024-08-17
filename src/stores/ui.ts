import { ReactNode } from 'react';
import { create } from 'zustand';

type MenuObject = {
  name?: string;
  desc?: string;
  component: ReactNode;
};

type OrientationType = 'horizontal' | 'vertical';

type Store = {
  isContextVisible: boolean;
  toggleContextVisibilty: () => void;
  setIsContextVisible: (visible: boolean) => void;

  menu: MenuObject | null;
  selectMenu: (menu: MenuObject) => void;

  paletteOrientation: OrientationType;
  setPaletteOrientation: (orientation: OrientationType) => void;
};

const useUIStore = create<Store>((set) => ({
  isContextVisible: true,
  toggleContextVisibilty: () =>
    set((state) => ({ isContextVisible: !state.isContextVisible })),
  setIsContextVisible: (visible: boolean) =>
    set(() => ({ isContextVisible: visible })),
  menu: null,
  selectMenu: (menu: MenuObject) => set(() => ({ menu })),
  paletteOrientation: 'horizontal',
  setPaletteOrientation: (orientation: OrientationType) =>
    set(() => ({ paletteOrientation: orientation })),
}));

export default useUIStore;
