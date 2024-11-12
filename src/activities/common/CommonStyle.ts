import { StyleSheet } from "react-native";
import { fromPercentToPixels } from "../../style/dimentions";

export const CommonStyle = StyleSheet.create({
  nextButtonWrapper: {
    width: 100,
    alignSelf: "center",
    margin: fromPercentToPixels(5)
  }
});
