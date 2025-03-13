import { StyleSheet } from "react-native";

export const ButtonStyling = StyleSheet.create({

    inner: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 5,
      alignItems: "center",
    },

    hostDisabled: {
      opacity: 0.7,
    },

    text: {
      color: "white"
    }
  })
