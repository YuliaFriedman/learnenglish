import { StyleSheet } from "react-native";
import { fromPercentToPixelsWidth } from "../../../../style/dimentions";

export const SayWordStyling = StyleSheet.create({

  host: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    width: "35%",
    maxWidth: 150,
    flex: 1,
    justifyContent: "space-between",
  },

  wordContainer: {
    width: "100%",
    height: "30%",
    alignSelf: "center"
  },

  micContainer: {
    alignSelf: "center",
    marginTop:20,
    backgroundColor: "green",
    borderRadius: 200,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  spaceView: {
    flex: 1
  },

  nextContainer: {
    alignSelf: "center",
    marginTop: 20,
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },

  next: {
    alignSelf: "center"
  }

})
