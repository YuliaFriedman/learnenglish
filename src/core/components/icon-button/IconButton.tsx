import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import React from "react";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";

export interface IconButtonProps{
  onPress?: () => void;
  icon: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
  disabled?: boolean;

}

export function IconButton({onPress, icon, iconColor, style, size, disabled}: IconButtonProps): React.JSX.Element {
  return (
    <Pressable style={style} onPress={() => onPress && onPress()} disabled={disabled}>
      <Icon name={icon} size={size || 30} color={iconColor || 'white'}/>
    </Pressable>
  )
}
