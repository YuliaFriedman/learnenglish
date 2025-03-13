import { StyleSheet } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const PrimaryButtonStyling = StyleSheet.create({
  textStyle: {
    color: ThemeManager.theme.buttons.primary.color,
    fontSize: 20
  },

  disabled: {
    opacity: 0.8
  }
})
