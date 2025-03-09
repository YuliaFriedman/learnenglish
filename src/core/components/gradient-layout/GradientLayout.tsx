import LinearGradient from "react-native-linear-gradient";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

export interface GradientLayoutProps {
  model: {
    colors: (string | number)[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
    useAngle?: boolean;
    angleCenter?: {x: number, y: number};
    angle?: number;
  }
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function GradientLayout({model, style, children}: GradientLayoutProps) {
  return (
    <LinearGradient
      style={style}
      colors={model.colors}
      start={model.start}
      end={model.end}
      locations={model.locations}
      useAngle={model.useAngle}
      angleCenter={model.angleCenter}
      angle={model.angle}
    >
      {children}
    </LinearGradient>
  );
}
