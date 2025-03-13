import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { animationStyles } from "../../../styles/animations.tsx";

interface PressableWithAnimationProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function PressableWithAnimation({onPress, children, style}: PressableWithAnimationProps) {
  return (
    <Pressable style={style} onPress={onPress}>
      {({ pressed }) => (
        <View style={pressed && animationStyles.pressed}>
          {children}
        </View>
      )}
    </Pressable>
  );
}
