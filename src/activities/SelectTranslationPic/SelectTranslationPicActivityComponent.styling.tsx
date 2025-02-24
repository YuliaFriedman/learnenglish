import { StyleSheet } from "react-native";
import { getTheme } from "../../style/Theme";
import { fromPercentToPixelsWidth } from "../../style/dimentions";

const theme = getTheme();

export const SelectTranslationPicActivityComponentStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: fromPercentToPixelsWidth(5),
  },
  question:{
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    margin: fromPercentToPixelsWidth(5),
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
    padding: fromPercentToPixelsWidth(5),
  }
});
