export interface CategoryStyle {
  colors: string[];
  locations: number[];
  borderColor: string;
  overlayColor: string;
}

export interface Category {
  type: CategoryType;
  title: string;
  icon: string;
  progress: number;
  passedFinal: boolean;
  style?: CategoryStyle;
}

export enum CategoryType{
  Colors = 'colors',
  Animals = 'animals',
  Vehicle = 'vehicle',
  Body = 'body',
}
