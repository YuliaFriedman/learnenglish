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
    paddingHorizontal: 30,
    alignSelf: "stretch",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  img: {
 },

  text: {
    marginLeft: 20,
  }
})
