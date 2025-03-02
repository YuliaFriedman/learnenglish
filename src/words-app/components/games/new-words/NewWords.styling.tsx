import { StyleSheet } from "react-native";

export const NewWordsStyling = StyleSheet.create({

  host:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "100%",
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
     margin: "5%"
  },

  wordCard: {
    width: "40%",
    height: "35%",
  },

})
