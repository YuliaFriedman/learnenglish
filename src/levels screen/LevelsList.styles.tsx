import { StyleSheet } from "react-native";

export const levelsListStyles = StyleSheet.create({
  levelsList: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
    flexWrap: "wrap"
  },

  levelTile: {
    height: 50,
    width: 50,
    backgroundColor: 'red'
  }
});
