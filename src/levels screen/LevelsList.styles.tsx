import { StyleSheet } from "react-native";

export const levelsListStyles = StyleSheet.create({
  levelsList: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
    flexWrap: "wrap",
    height: "100%"
  },

  levelTile: {
    height: 50,
    width: 50,
  }
});
