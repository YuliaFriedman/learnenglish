import { getTheme } from "../../style/Theme";
import { StyleSheet,Dimensions } from "react-native";

const theme = getTheme();

const viewWidth = Dimensions.get('window').width;

export const SentenceBlockComponentStyle = StyleSheet.create({
  host: {
    borderWidth: 1,
    borderColor: theme.sentenceBlock.borderColor,
    backgroundColor: theme.sentenceBlock.background,
    borderStyle: "solid",
    padding: viewWidth/25,
    borderRadius: viewWidth/100
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  volumeIcon: {
    marginRight: 10
  }
});
