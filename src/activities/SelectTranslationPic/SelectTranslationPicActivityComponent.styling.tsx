import { StyleSheet } from "react-native";
import { getTheme } from "../../style/Theme";
import { fromPercentToPixels } from "../../style/dimentions";

const theme = getTheme();

export const SelectTranslationPicActivityComponentStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: fromPercentToPixels(5),
  },
  question:{
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    margin: fromPercentToPixels(5),
  },
  answerRow: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  answer: {
    flex: 1,
    alignSelf: "center",
    display: "flex",
    padding: fromPercentToPixels(5),
  }
});
