import { StyleSheet } from "react-native";
import { ThemeManager } from "./style/ThemeManager.ts";

export const WordsAppStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative"
  },

  header:{
    zIndex: 100
  },

  content:{
    position: "relative",
    backgroundColor: ThemeManager.theme.content.bg,
    flex: 1
  },

  contentBG: {
    position: "absolute",
    height: "100%",
    width: "100%",
  }
});
