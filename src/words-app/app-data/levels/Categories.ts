import { Category, CategoryStyle } from "../models/CategoryModel";
import { ThemeManager } from "../../style/ThemeManager.ts";

export const categories: Category[] = [
  {
    id: "colors",
    title: "Colors",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card1)
  },
  {
    id: "animals",
    title: "Animals",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card2)
  },
  {
    id: "vehicle",
    title: "Vehicle",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card3)
  },
  {
    id: "body",
    title: "body",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card4)
  }
];

function createStyle(themeStyle: any):CategoryStyle {
  return {
    colors: themeStyle.bgColors,
    locations: themeStyle.bgLocations,
    borderColor: themeStyle.borderColor,
    overlayColor: themeStyle.overlayColor
  }
}
