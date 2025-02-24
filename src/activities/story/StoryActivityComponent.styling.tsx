import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth } from "../../style/dimentions";

export const StoryActivityComponentStyling = StyleSheet.create({
  host: {
    margin: fromPercentToPixelsWidth(4),
    display: "flex",
    gap: fromPercentToPixelsWidth(4)
  }
});
