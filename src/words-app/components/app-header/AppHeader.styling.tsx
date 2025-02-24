import { StyleSheet } from "react-native";
import { ThemeManager } from "../../style/ThemeManager.ts";
import { Colors } from "../../../style/Colors";


export const AppHeaderStyling = StyleSheet.create({
  headerBorder:{
    borderBottomColor: ThemeManager.theme.header.bottomBorder,
    borderBottomWidth: 3,
    shadowColor: ThemeManager.theme.header.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 10,
    overflow: "hidden"
  },

  innerWrapper: {
    borderBottomColor: Colors.orange1,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  host: {
    display: "flex",
    flexDirection: "row",
    padding: 10
  },

  leftPart: {
    flex:1
  },

  rightPart: {
    flex:1
  },

  title: {
    textAlign: "center",
    color: ThemeManager.theme.header.textColor,
    fontSize: 20,
    fontWeight: "bold"
  },

  homeButton: {
    alignSelf: "flex-start"
  }
})
