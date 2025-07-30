export type ConfigContextType = {
  visual: VisualMap;
  handleSetVisual: <Type extends VisualType>(type: Type, value: VisualMap[Type]) => void;
  ftu: FtuMap;
  handleSetFtu: <Type extends FtuType>(type: Type, value: FtuMap[Type]) => void;
  sound: SoundMap;
  handleSetSound: <Type extends SoundType>(type: Type, value: SoundMap[Type]) => void;
};

// Efectos y colores visuales
export type VisualMap = {
  floatModal: boolean;
  darkMode: boolean;
};
export type VisualType = keyof VisualMap;
export const VisualDefault: VisualMap = {
  floatModal: false,
  darkMode: false,
};

// Eventos First Time Use
export type FtuMap = {
  prelude: boolean;
};
export type FtuType = keyof FtuMap;
export const FtuDefault: FtuMap = {
  prelude: true,
}

// Volumen
export type SoundMap = {
  global: number,
  music: number,
  sfx: number,
  dialog: number,
};
export type SoundType = keyof SoundMap;
export const SoundDefault: SoundMap = {
  global: 1,
  music: 1,
  sfx: 1,
  dialog: 1,
};