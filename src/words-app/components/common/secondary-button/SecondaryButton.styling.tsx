import { StyleSheet } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const SecondaryButtonStyling = StyleSheet.create({
  nextButton:{
    backgroundColor: "transparent"
  },

  textStyle: {
    color: ThemeManager.theme.buttons.secondary.color,
    fontSize: 20
  },

  buttonWrapperStyle: {
    //marginVertical: "10%",
    padding: 3,
    borderRadius: 5
  }
})
