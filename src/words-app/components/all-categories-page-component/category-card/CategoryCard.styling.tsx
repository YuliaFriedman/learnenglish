import { ThemeManager } from "../../../style/ThemeManager.ts";
import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth, scaleFontSize } from "../../../../style/dimentions.ts";

export const CategoryCardStyling = StyleSheet.create({
  CategoryCell: {
    display: "flex",
    flexDirection: "column",
    margin: "5%",
    alignItems: "stretch",
  },

  image: {

    height: fromPercentToPixelsWidth(20),
    width: fromPercentToPixelsWidth(20),
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
