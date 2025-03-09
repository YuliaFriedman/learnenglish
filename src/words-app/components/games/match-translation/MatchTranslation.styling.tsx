import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth } from "../../../../style/dimentions";

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
    height: "10%",
    marginBottom: "10%"
  },

  singleMatchItem: {
    flex: 1,
    backgroundColor: "yellow"
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
    margin: "10%",
    flex: 1
  },

  wordCard: {
    width: "40%",
    height: "40%",
    backgroundColor: "red"
  },

  dropHighlight: {
    backgroundColor: "yellow"
  },

  draggedLayout: {
    borderColor: "red",
    backgroundColor: "red"
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
