import { create } from 'zustand';

type SettingsType = {
  n_colors: number;
  algorithm: 'KMeans' | 'KMeansPP';
  precision?: number;
  n_size?: number;
};

type Store = {
  colors: string[];
  setColors: (colors: string[]) => void;

  palette: string[];
  setPalette: (palette: string[]) => void;
  addColor: (c: string) => void;
  removeColor: (c: string) => void;

  imageFile: File | null;
  setImageFile: (imageFile: File | null) => void;

  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
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

  settings: {
    n_colors: 5,
    algorithm: 'KMeans',
  },
  setSettings: (settings: SettingsType) => set(() => ({ settings })),
}));

export default useChromaStore;
