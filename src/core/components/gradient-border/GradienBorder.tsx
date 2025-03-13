import LinearGradient from "react-native-linear-gradient";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface GradientBorderModelProp {
  colors: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  useAngle?: boolean;
  angleCenter?: {x: number, y: number};
  angle?: number;
}

export interface GradientBorderProps {
  model: GradientBorderModelProp;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  innerStyle?: ViewStyle
}

export function GradientBorder({model, style, innerStyle, children}: GradientBorderProps) {
  return (
    <LinearGradient
      colors={model.colors}
      start={model.start}
      end={model.end}
      style={[style]}
    >
      <View style={[innerStyle, gradientBorderStyle.innerContainer]}>
          {children}
      </View>
    </LinearGradient>
  );
}

const gradientBorderStyle = StyleSheet.create({
  innerContainer: {
    //flex: 1,
    margin: 2, // <-- Border Width
    //justifyContent: "center",
    //alignItems: "center",
    overflow: "hidden"
  },
});
