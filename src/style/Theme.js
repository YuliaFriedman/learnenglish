import { LightTheme } from "./Light";
import { Colors } from "./Colors";

/*export function getTheme(){
  return LightTheme;
}*/

const ThemeManager = {

  currentTheme: null,

  init(){

  },

  loadTheme(){

  },

  setTheme(theme){

  },

  getTheme(){

  }
}

const theme = LightTheme;

// Get screen dimensions
import { Dimensions } from "react-native";
import _ from "lodash";
import { scaleFontSize } from "./dimentions";

const { width, height } = Dimensions.get('window');

// Define a base width for scaling (e.g., iPhone 6 width)
const baseWidth = 375;

export function getTheme(){
  return _.merge({
    chunkText: {
      fontSize: scaleFontSize(20)
    },
    sentenceBlock: {
      voiceIconSize: 30
    },
    header: {
      fontSize: scaleFontSize(20)
    },
    SelectTranslationPicText: {
      fontSize: scaleFontSize(20)
    },
    SelectAnswerBlockVoice:{
      voiceIconSize: 30
    }
  }, theme);
}

