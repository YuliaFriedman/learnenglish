import { StyleSheet } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const SayWordStyling = StyleSheet.create({

  host: {
    alignSelf: "center",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    width: "100%"
  },

  wordContainer: {
    width: "80%",
    height: "40%",
    margin: "10%",
    alignSelf: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: ThemeManager.theme.games.sayTheWord.cardWrapper.backgroundColor,
    borderWidth: 2,
    borderColor: ThemeManager.theme.games.sayTheWord.cardWrapper.borderColor,
    borderRadius: 10,
    ...ThemeManager.theme.shadow(ThemeManager.theme.games.sayTheWord.cardWrapper.shadowColor)
  },

  wordStyling: {
    width: "100%",
    maxWidth: 150
  },

  micStyling: {
    marginVertical: 30
  },

  nextContainer: {
    alignSelf: "center",
    marginTop: 20,
    flex: 1,
    justifyContent: "center"
  },

  next: {
    width: '80%',
    marginLeft: '10%',
    marginVertical: 40
  },

})
