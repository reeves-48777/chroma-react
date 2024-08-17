import { SelectableColor, Color } from '@/core';
import { create } from 'zustand';

type Store = {
  colors: SelectableColor[];
  setColors: (colors: SelectableColor[]) => void;

  palette: Color[];
  setPalette: (palette: Color[]) => void;
  addColor: (c: Color) => void;
  removeColor: (c: Color) => void;

  imageFile: File | null;
  setImageFile: (imageFile: File | null) => void;
};

const useChromaStore = create<Store>((set) => ({
  colors: [],
  setColors: (colors: SelectableColor[]) => set(() => ({ colors })),

  palette: [],
  setPalette: (palette: Color[]) => set(() => ({ palette })),
  addColor: (c: string) => set((state) => ({ palette: [...state.palette, c] })),
  removeColor: (c: string) =>
    set((state) => ({ palette: state.palette.filter((color) => color !== c) })),

  imageFile: null,
  setImageFile: (imageFile: File | null) => set(() => ({ imageFile })),
}));

export default useChromaStore;
