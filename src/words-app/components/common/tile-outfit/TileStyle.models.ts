
export interface TileStyle {
  colors?: string[];
  locations?: number[];
  borderColor?: string;
  overlay: {
    color: string|undefined;
    pos: {
      bottom: number;
      right: number;
    }
  }
}

export interface TileOutfitProps{
  tileStyle: TileStyle;
}
