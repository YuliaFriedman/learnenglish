import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { GradientColorProps } from "../gradient-layout/GradientLayout.tsx";

export interface ButtonStyle {
    textStyle?: TextStyle;
    buttonStyle?: StyleProp<ViewStyle>;
    pressedButtonStyle?: GradientColorProps;
    backgroundStyle: GradientColorProps;
}

export interface ButtonModel<T = {}> {
    onPress?: () => void;
    disabled?: boolean;
    style?: ButtonStyle;
    children?: ReactNode | string;
}
