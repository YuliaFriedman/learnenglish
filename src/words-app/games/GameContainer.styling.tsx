import { StyleSheet } from "react-native";

export const GameContainerStyling = StyleSheet.create({
  groupContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    columnGap: 30,
    justifyContent: "center",
    margin: "10%"
  },

  step: {
    width: "20%",
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 2,
    padding: 10,
    position: "relative"

  },

  stepText: {
    textAlign: "center"
  },

  starIcon: {
    position: "absolute",
    top: -15,
    left: -15,
  }

})
