import { StyleSheet } from "react-native";
import { fromPercentToPixels } from "../../style/dimentions";

export const SaySentenceActivityComponentStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column"
  },

  sentence:{
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    margin: fromPercentToPixels(5),
  }
});
