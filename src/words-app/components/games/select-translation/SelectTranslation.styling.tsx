import { StyleSheet } from "react-native";

export const SelectTranslationStyling = StyleSheet.create({

  host:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "center",
    marginLeft: '5%',
    marginRight: '5%',
    flex: 1,
    alignContent: "center",
  },

  wordCard: {
    width: "40%",
    height: "37%"
  },

  next: {
    marginTop: "10%",
    marginBottom: "10%",
    alignSelf: "center"
  }

})
