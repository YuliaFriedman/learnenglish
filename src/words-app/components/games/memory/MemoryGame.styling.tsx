import { StyleSheet } from "react-native";
import { fromPercentToPixelsHeight, fromPercentToPixelsWidth } from "../../../../style/dimentions.ts";

export const MemoryGameStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex:1,
  },

  cardsContainer: {
    flex: 1,
    flexDirection: "row",
    gap: fromPercentToPixelsWidth(5),
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: fromPercentToPixelsWidth(5)
  },

  card: {
    width: fromPercentToPixelsWidth(40),
    height: fromPercentToPixelsHeight(15)
  },

  buttonContainer: {

    marginLeft: fromPercentToPixelsWidth(10),
    marginBottom: fromPercentToPixelsWidth(10),
    width: fromPercentToPixelsWidth(80),
  },

  nextButton: {
    width: "100%",

  }
})
