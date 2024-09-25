import { getTheme } from "../../../style/Theme";
import { StyleSheet,Dimensions } from "react-native";
import { fromPercentToPixels } from "../../../style/dimentions";

const theme = getTheme();

export const SentenceBlockComponentStyle = StyleSheet.create({
  host: {
    borderStyle: "solid",
    padding: fromPercentToPixels(4),
  },
  container: {
    backgroundColor: theme.sentenceBlock.background,
    borderWidth: 1,
    borderColor: theme.sentenceBlock.borderColor,
    borderRadius: fromPercentToPixels(2),
    display: "flex",
    flexDirection: "row",
    padding: fromPercentToPixels(4),
    margin: fromPercentToPixels(4)
  },
  rtlContainer: {
    flexDirection: "row-reverse"
  },
  volumeIcon: {
    marginRight: 10
  }
});
