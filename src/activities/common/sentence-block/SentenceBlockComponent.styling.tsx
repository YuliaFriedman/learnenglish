import { getTheme } from "../../../style/Theme";
import { StyleSheet,Dimensions } from "react-native";
import { fromPercentToPixelsWidth } from "../../../style/dimentions";
import NamedStyles = StyleSheet.NamedStyles;

const theme = getTheme();

export enum SentenceBlockComponentStyleType {
  Blocks,
  Clean
}

const cleanStyle = {
  host: {
    padding: 0
  },
  container: {
    borderWidth: 0,
    backgroundColor: "transparent",
    margin: 0
  }
}

export const getSentenceBlockComponentStyle = (type: SentenceBlockComponentStyleType) => {
  return StyleSheet.create(
    {
      host: {
        borderStyle: "solid",
        padding: fromPercentToPixelsWidth(4),
        ...(type === SentenceBlockComponentStyleType.Clean ? cleanStyle.host : {})
      },
      container: {
        backgroundColor: theme.sentenceBlock.background,
        borderWidth: 1,
        borderColor: theme.sentenceBlock.borderColor,
        borderRadius: fromPercentToPixelsWidth(2),
        display: "flex",
        flexDirection: "row",
        padding: fromPercentToPixelsWidth(4),
        margin: fromPercentToPixelsWidth(4),
        ...(type === SentenceBlockComponentStyleType.Clean ? cleanStyle.container : {})
      },
      rtlContainer: {
        flexDirection: "row-reverse"
      },
      volumeIcon: {
        marginRight: 10,
        marginLeft: 10
      }
    }
  );
}
