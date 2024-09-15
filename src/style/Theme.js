import { LightTheme } from "./Light";
import { Colors } from "./Colors";

/*export function getTheme(){
  return LightTheme;
}*/

const theme = LightTheme;

// Get screen dimensions
import { Dimensions } from "react-native";
import _ from "lodash";

const { width, height } = Dimensions.get('window');

// Define a base width for scaling (e.g., iPhone 6 width)
const baseWidth = 375;

// Function to scale font size based on screen width
const scaleFontSize = (size) => {
  return Math.round((size * width) / baseWidth);
};

export function getTheme(){
  return _.merge({
    chunkText: {
      fontSize: scaleFontSize(18)
    },
    sentenceBlock: {
      voiceIconSize: 30
    },
    header: {
      fontSize: scaleFontSize(20)
    }
  }, theme);
}

