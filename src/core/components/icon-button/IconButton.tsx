import { Pressable, StyleProp, Text, ViewStyle } from "react-native";
import React from "react";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";

export interface IconButtonProps{
  onPress?: () => void;
  icon: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  size?: number
}

export function IconButton({onPress, icon, iconColor, style, size}: IconButtonProps): React.JSX.Element {
  return (
    <Pressable style={style} onPress={() => onPress && onPress()}>
      <Icon name={icon} size={size || 30} color={iconColor || 'white'}/>
    </Pressable>
  )
}
