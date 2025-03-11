import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth } from "../../../../style/dimentions";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { Colors } from "../../../../style/Colors";

export const MatchTranslationStyling = StyleSheet.create({

  host: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },

  matchesContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "pink"
  },

  translationsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    height: "15%",
    margin: '5%'
  },

  singleMatchItem: {
    flex: 1,
    backgroundColor: Colors.lightPurple4,
    borderRadius: 20,
    borderWidth: 0
  },

  droppedMatchItem: {
    opacity: 0.5
  },

  cardRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "center",
    alignContent: 'center',
    margin: "10%",
    flex: 1,
  },

  wordCard: {
    width: "40%",
    height: "40%",
  },

  droppableStyle: {
    borderRadius: 20,
    borderWidth: 1,
    ...ThemeManager.theme.shadow(ThemeManager.theme.games.matchTranslation.highlight.shadow)
  },

  answerStyle: {
    backgroundColor: ThemeManager.theme.games.matchTranslation.answer.backgroundColor,
  },

  nextContainer: {
    alignSelf: "center",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    padding: 20
  },

  footerButtonStyle: {
    flex: 1
  }

})
