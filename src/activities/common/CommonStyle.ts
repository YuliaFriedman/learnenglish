import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth } from "../../style/dimentions";

export const CommonStyle = StyleSheet.create({
  nextButtonWrapper: {
    width: 100,
    alignSelf: "center",
    margin: fromPercentToPixelsWidth(5)
  }
});
