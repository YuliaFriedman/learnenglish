import { StyleSheet } from "react-native";

export const WordTextCardStyling = (background: string) => StyleSheet.create({
  host:{
    borderRadius: 20,
  },

  innerContainer: {
    borderRadius: 18,
    backgroundColor: background
  },

  contentWrapper: {
    flexDirection: "row",
    padding: 10,
    paddingHorizontal: 30
  },

  img: {
 },

  text: {
    marginLeft: 20,
  }
})
