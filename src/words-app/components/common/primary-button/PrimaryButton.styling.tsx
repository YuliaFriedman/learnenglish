import { StyleSheet } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const PrimaryButtonStyling = StyleSheet.create({
  textStyle: {
    color: ThemeManager.theme.buttons.primary.color,
    fontSize: 20
  },

  buttonStyle:{
    backgroundColor: "transparent"
  },

  buttonWrapperStyle: {
    margin: "10%",
    padding: 3,
    borderRadius: 5
  }
})
