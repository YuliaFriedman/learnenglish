import { StyleSheet } from "react-native";
import { ThemeManager } from "./style/ThemeManager.ts";

export const WordsAppStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  header:{
    zIndex: 100
  },

  content:{
    backgroundColor: ThemeManager.theme.content.bg,
    flex: 1
  }
});
