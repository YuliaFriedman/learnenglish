import { StyleSheet } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const WordCardStyling = (cardStyle: any, background: string) => {
  return StyleSheet.create({
    host: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      flex: 1
    },

    imageContainer: {
      width: '100%',  // or any desired width
      height: undefined,    // define a height
      overflow: 'hidden',
      alignItems: "center",
      marginTop: "5%",
      flex: 1,
      padding: "15%"
    },

    invisibleImg: {
      opacity: 0
    },

    img: {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      aspectRatio: 1, // Adjust this value to match your image's aspect ratio
      resizeMode: 'contain'
    },
    text: {
      marginBottom: "5%",
    },

    innerContainer: {
      borderRadius: 18,
      backgroundColor: background,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  })
}
