export interface CategoryStyle {
  colors: string[];
  locations: number[];
  borderColor: string;
  overlayColor: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  progress: number;
  passedFinal: boolean;
  style?: CategoryStyle;
}
