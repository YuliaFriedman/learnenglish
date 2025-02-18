import { ReactElement } from "react";

export interface TileStyle {
  colors?: string[];
  locations?: number[];
  borderColor?: string;
  overlayColor?: string;
}

export interface TileOutfitProps{
  children: ReactElement;
  tileStyle: TileStyle;
}
