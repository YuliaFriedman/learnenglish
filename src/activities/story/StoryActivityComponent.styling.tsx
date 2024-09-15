import { Dimensions, StyleSheet } from "react-native";

const viewWidth = Dimensions.get('window').width;

export const StoryActivityComponentStyling = StyleSheet.create({
  host: {
    margin: viewWidth/25,
    display: "flex",
    gap:viewWidth/25
  }
});
