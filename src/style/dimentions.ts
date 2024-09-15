// Get screen dimensions
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

// Define a base width for scaling (e.g., iPhone 6 width)
const baseWidth = 375;

// Function to scale font size based on screen width
const scaleFontSize = (size) => {
  return Math.round((size * width) / baseWidth);
};

export const AppDimentions = {
  fontsize: scaleFontSize(18)
}
