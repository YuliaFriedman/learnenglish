import { StyleSheet } from "react-native";

export const CategoryCompletedStyling = StyleSheet.create({
  host: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "80%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: "10%",
    marginTop: "10%",
  },

  title: {
    //fontSize: 25,
    //flex: 1
    fontWeight: "bold",
  },

  imgContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },

  img: {
  },

  button: {
    //flex: 1
  }
});
