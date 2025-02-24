import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth, scaleFontSize } from "../../../style/dimentions";

export const AllCategoriesStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: fromPercentToPixelsWidth(5),
    gap: 20,
    justifyContent: "center"
  },

  category: {
    width: fromPercentToPixelsWidth(40),
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: fromPercentToPixelsWidth(5),
    display: "flex",
    flexDirection: "column"
  },





  text: {
    marginBottom: fromPercentToPixelsWidth(5),
    fontSize: scaleFontSize(20),
    color: "white"
  },

  testContainer: {
    display: "flex",
    flexDirection: "row",
    margin: fromPercentToPixelsWidth(5),
    width: fromPercentToPixelsWidth(100) - fromPercentToPixelsWidth(10),
    flexWrap: "wrap"
  },
  column: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: 5
  },

});
