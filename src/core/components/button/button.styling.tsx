import { StyleSheet } from "react-native";

export const ButtonStyling = StyleSheet.create({
    host:{
      backgroundColor: "blue",
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: "center"
    },

    hostDisabled: {
      opacity: 0.5,
    },

    text: {
      color: "white"
    }
  })
