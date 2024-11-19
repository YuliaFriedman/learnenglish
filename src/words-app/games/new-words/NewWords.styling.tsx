import { StyleSheet } from "react-native";

export const NewWordsStyling = StyleSheet.create({

  host:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },

  next: {
    alignSelf: "center"
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
  },

})
