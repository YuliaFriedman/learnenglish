import { StyleSheet } from "react-native";
import { fromPercentToPixels } from "../../style/dimentions";

export const StoryActivityComponentStyling = StyleSheet.create({
  host: {
    margin: fromPercentToPixels(4),
    display: "flex",
    gap: fromPercentToPixels(4)
  }
});
