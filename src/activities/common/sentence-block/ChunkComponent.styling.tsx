import { StyleSheet } from "react-native";
import { getTheme } from "../../../style/Theme";

const theme = getTheme();

export const ChunkComponentStyling = StyleSheet.create({
    text: {
      textDecorationLine: "underline",
      color: theme.chunkText.textColor,
      fontSize: theme.chunkText.fontSize
    },
    selectedText: {
      color: theme.chunkText.selectedTextColor
    },
    rtl: {
      direction: "rtl"
    }
});
