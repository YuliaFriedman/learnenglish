import { StyleSheet } from "react-native";
import { fromPercentToPixels, scaleFontSize } from "../../style/dimentions";

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
  testCell: {
    backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    margin: "5%",
    alignItems: "stretch",
    borderRadius: 15,
  },

  image: {

    height: fromPercentToPixels(20),
    width: fromPercentToPixels(20),
    margin: "5%",
    backgroundColor: "white"

  },

  imageWrapper: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    margin: 15,
    marginBottom: 0,
    backgroundColor: "white",

  },

  testText: {
    margin: "5%",
    textAlign: "center",
    color: "white",
    fontSize: scaleFontSize(15)
  }
});
