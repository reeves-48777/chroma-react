import { create } from 'zustand';

type Store = {
  colors: string[];
  setColors: (colors: string[]) => void;

  palette: string[];
  setPalette: (palette: string[]) => void;
  addColor: (c: string) => void;
  removeColor: (c: string) => void;

  imageFile: File | null;
  setImageFile: (imageFile: File | null) => void;
};

const useChromaStore = create<Store>((set) => ({
  colors: [],
  setColors: (colors: string[]) => set(() => ({ colors })),

  palette: [],
  setPalette: (palette: string[]) => set(() => ({ palette })),
  addColor: (c: string) => set((state) => ({ palette: [...state.palette, c] })),
  removeColor: (c: string) =>
    set((state) => ({ palette: state.palette.filter((color) => color !== c) })),

  imageFile: null,
  setImageFile: (imageFile: File | null) => set(() => ({ imageFile })),
}));

export default useChromaStore;
