
export interface TileStyle {
  colors?: string[];
  locations?: number[];
  borderColor?: string;
  overlay?: {
    color: string|undefined;
    pos: {
      bottom: number;
      right: number;
    }
  },
  start?: { x: number; y: number },
  end?: { x: number; y: number }
}

export interface TileOutfitProps{
  tileStyle: TileStyle;
}
