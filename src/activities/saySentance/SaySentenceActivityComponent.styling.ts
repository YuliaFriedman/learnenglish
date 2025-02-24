import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth } from "../../style/dimentions";

export const SaySentenceActivityComponentStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column"
  },

  sentence:{
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    margin: fromPercentToPixelsWidth(5),
  }
});
