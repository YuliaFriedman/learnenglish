import { StyleSheet } from "react-native";
import { fromPercentToPixelsHeight, fromPercentToPixelsWidth } from "../../../../style/dimentions.ts";

export const NewWordsStyling = StyleSheet.create({

  host:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    height: "100%",
  },

  next: {
    alignSelf: "center",
    alignContent: "center",
    marginVertical: 20,
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "center",
    alignContent: "center",
    margin: fromPercentToPixelsWidth(5)
  },

  wordCard: {
    width: "40%",
    height: fromPercentToPixelsHeight(30),
  },

})
