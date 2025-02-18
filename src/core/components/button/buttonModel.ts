import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export interface ButtonStyle {
    textStyle?: TextStyle;
    buttonStyle?: ViewStyle;
}

export interface ButtonModel<T = {}> {
    onPress?: () => void;
    disabled?: boolean;
    style?: ButtonStyle;
    children?: ReactNode | string;
}
