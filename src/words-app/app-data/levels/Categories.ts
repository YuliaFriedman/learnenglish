import { Category, CategoryStyle, CategoryType } from "../models/CategoryModel";
import { ThemeManager } from "../../style/ThemeManager.ts";

export const categories: Category[] = [
  {
    type: CategoryType.Colors,
    title: "Colors",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card1)
  },
  {
    type: CategoryType.Animals,
    title: "Animals",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card2)
  },
  {
    type: CategoryType.Vehicle,
    title: "Vehicle",
    icon: "ball",
    progress: 0,
    passedFinal: false,
    style: createStyle(ThemeManager.theme.categoryCard.card3)
  },
  {
    type: CategoryType.Body,
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
