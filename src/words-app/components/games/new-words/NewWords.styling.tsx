import { StyleSheet } from "react-native";
import { fromPercentToPixelsHeight, fromPercentToPixelsWidth } from "../../../../style/dimentions.ts";

export const NewWordsStyling = StyleSheet.create({

  host:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  },

  next: {
    width: '80%',
    marginLeft: '10%'
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
