export interface Selectable<T> {
  value: T;
  selected: boolean;
}

export interface Note {
  version: string;
  text: string;
}

export type Color = string;
export type SelectableColor = Selectable<Color>;
