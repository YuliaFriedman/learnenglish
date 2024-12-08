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
    flex: 1,

  },

  selectedWordCard: {
    backgroundColor: "#eeeeff"
  },

  incorrectWordCard: {
    backgroundColor: "#ffeeee"
  },

  imageContainer:{
    width: '100%',  // or any desired width
    height: undefined,    // define a height
    overflow: 'hidden',
    alignItems: "center"
  },

  invisibleImg: {
    opacity: 0
  },

  img: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    aspectRatio: 1, // Adjust this value to match your image's aspect ratio
    resizeMode: 'contain',
 },
  text: {
    marginBottom: "10%",
    fontSize:20,
  }
})
