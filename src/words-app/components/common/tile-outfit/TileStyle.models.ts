import { StyleProp, ViewStyle } from "react-native";

export interface TileStyle {
  additionalStyle?: StyleProp<ViewStyle>;
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
