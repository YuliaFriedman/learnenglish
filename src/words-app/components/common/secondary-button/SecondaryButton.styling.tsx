import { StyleSheet } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const SecondaryButtonStyling = StyleSheet.create({

  textStyle: {
    color: ThemeManager.theme.buttons.secondary.color,
    fontSize: 20
  },
})
