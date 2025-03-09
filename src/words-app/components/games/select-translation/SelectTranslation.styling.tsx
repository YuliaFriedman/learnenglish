import { StyleSheet } from "react-native";
import { fromPercentToPixelsHeight, fromPercentToPixelsWidth } from "../../../../style/dimentions.ts";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export const SelectTranslationStyling = StyleSheet.create({

  host: {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },

  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    backgroundColor: ThemeManager.theme.games.selectTranslation.header.backgroundColor,
    ...ThemeManager.theme.shadow(ThemeManager.theme.games.selectTranslation.header.shadowColor),
    padding: 20,
    borderBottomColor: ThemeManager.theme.games.selectTranslation.header.borderBottomColor,
    borderBottomWidth: 1
  },

  questionCard: {
    paddingHorizontal: 50,
    paddingVertical: 20
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    justifyContent: "center",
    marginHorizontal: '5%',
    alignContent: "center",
  },

  wordCard: {
    width: "40%",
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    height: fromPercentToPixelsHeight(25)
  },

  next: {
    width: '80%',
    marginLeft: '10%',
    marginVertical: 40
 },

})
