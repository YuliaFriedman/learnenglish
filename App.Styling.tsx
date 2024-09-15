import { StyleSheet } from "react-native";
import { getTheme } from "./src/style/Theme";

const theme = getTheme();

export const AppStyles = StyleSheet.create({
    host: {
      backgroundColor: theme.app.background,
      flex: 1
    },
    header: {
      display: "flex",
      backgroundColor: theme.header.bg,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      gap: 10,
      padding: 10
    },

    backButton: {
      backgroundColor: "transparent",

    },

    backButtonText: {
      color: theme.header.backButtonColor
    },

    menuButton: {
      backgroundColor: "transparent",

    },

    menuButtonText: {
      color: theme.header.backButtonColor
    },

    title:{
      flex: 1,
      textAlign: "center",
      color: theme.header.color,
      fontSize: theme.header.fontSize
    }
});
