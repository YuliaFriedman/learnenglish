import { StyleSheet } from "react-native";

export const SelectTranslationStyling = StyleSheet.create({

  host:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "center",
    margin: "10%"
  },

  wordCard: {
    width: "40%",
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 2,
    padding: 10,
    position: "relative"

  },

  selectedWordCard: {
    backgroundColor: "#eeeeff"
  },

  incorrectWordCard: {
    backgroundColor: "#ffeeee"
  },

  next: {
    alignSelf: "center"
  }

})
