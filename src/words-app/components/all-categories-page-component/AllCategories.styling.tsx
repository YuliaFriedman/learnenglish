import { StyleSheet } from "react-native";
import { fromPercentToPixels, scaleFontSize } from "../../../style/dimentions";

export const AllCategoriesStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: fromPercentToPixels(5),
    gap: 20,
    justifyContent: "center"
  },

  category: {
    width: fromPercentToPixels(40),
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: fromPercentToPixels(5),
    display: "flex",
    flexDirection: "column"
  },





  text: {
    marginBottom: fromPercentToPixels(5),
    fontSize: scaleFontSize(20),
    color: "white"
  },

  testContainer: {
    display: "flex",
    flexDirection: "row",
    margin: fromPercentToPixels(5),
    width: fromPercentToPixels(100) - fromPercentToPixels(10),
    flexWrap: "wrap"
  },
  column: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: 5
  },

});
