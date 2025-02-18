import { ThemeManager } from "../../../style/ThemeManager.ts";
import { StyleSheet } from "react-native";
import { fromPercentToPixels, scaleFontSize } from "../../../../style/dimentions.ts";

export const CategoryCardStyling = StyleSheet.create({
  CategoryCell: {
    display: "flex",
    flexDirection: "column",
    margin: "5%",
    alignItems: "stretch",
  },

  image: {

    height: fromPercentToPixels(20),
    width: fromPercentToPixels(20),
    margin: "5%",
  },

  imageWrapper: {
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    margin: 15,
    marginBottom: 0,
  },

  cardText: {
    margin: "5%",
    textAlign: "center",
    color: ThemeManager.theme.categoryCard.textColor,
    fontSize: scaleFontSize(20),
    fontWeight: "bold"
  }

})
