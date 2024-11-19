import { StyleSheet } from "react-native";

export const WordCardStyling = StyleSheet.create({
  host:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 2,
  },

  selectedWordCard: {
    backgroundColor: "#eeeeff"
  },

  incorrectWordCard: {
    backgroundColor: "#ffeeee"
  },
  img: {
   width: "100%",
   height: 100,
    marginBottom: "10%"
 },
  text: {
    fontSize:20
  }
})
