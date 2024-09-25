import { StyleSheet } from "react-native";
import { getTheme } from "../../style/Theme";
import { fromPercentToPixels } from "../../style/dimentions";

const theme = getTheme();

export const SelectTranslationPicActivityComponentStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
  },
  question:{
    flex: 1,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    padding: fromPercentToPixels(5),
    marginBottom: fromPercentToPixels(5)
  },
  text: {
    fontSize: theme.SelectTranslationPicText.fontSize,
  },
  answerRow: {
    display: "flex",
    flexDirection: "row",
    //height:
  },
  answer: {
    flex: 1,
    alignItems: "center",
    padding: fromPercentToPixels(4),
    margin: fromPercentToPixels(4),
    borderColor: theme.SelectTranslationPicAnswer.borderColor,
    borderWidth: 1,
    borderRadius: fromPercentToPixels(2)
  },
  selectedAnswer: {
    backgroundColor: theme.SelectTranslationPicSelectedAnswer.backButtonColor
  },
  wrongAnswer: {
    backgroundColor: theme.SelectTranslationPicWrongAnswer.backButtonColor
  }
});
