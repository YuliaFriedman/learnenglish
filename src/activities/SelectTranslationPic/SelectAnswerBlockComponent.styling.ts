import { StyleSheet } from "react-native";
import { fromPercentToPixels } from "../../style/dimentions";
import { getTheme } from "../../style/Theme";

const theme = getTheme();

export const style = StyleSheet.create({
  textWrapper: {
    marginRight: "5%"
  }
});

export const SelectAnswerBlockStyling = StyleSheet.create({
  host: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    padding: fromPercentToPixels(4),
    //margin: fromPercentToPixels(4),
    borderColor: theme.SelectTranslationPicAnswer.borderColor,
    borderWidth: 1,
    borderRadius: fromPercentToPixels(2),
  },
  text: {
    fontSize: theme.SelectTranslationPicText.fontSize,
    marginBottom: fromPercentToPixels(4),
    textAlign: "center"
    //paddingRight: 10

  },
  selectedAnswer: {
    backgroundColor: theme.SelectTranslationPicSelectedAnswer.background
  },
  wrongAnswer: {
    backgroundColor: theme.SelectTranslationPicWrongAnswer.background
  },
  image: {
    padding: fromPercentToPixels(4),
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

