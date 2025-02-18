import { StyleSheet, View } from "react-native";
import { AnimatableNumericValue, DimensionValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import RadialGradient from "react-native-radial-gradient";

export interface DecorOverlayArcProps {
  radius: AnimatableNumericValue;
  color: string;
}

export function DecorOverlayArc({radius,color}:DecorOverlayArcProps){

  const  styling = decorOverlayArcStyling({radius,color});
  return (
    <View style={styling.host}>
    <RadialGradient style={styling.inner}
                    colors={['rgba(255, 255, 255, 0)', color]}
                    stops={[0, 1]}
                     center={[100,100]}
                     radius={200}
    ></RadialGradient>
    </View>
  )
}

const decorOverlayArcStyling = (props: DecorOverlayArcProps) => StyleSheet.create({
  host: {
    borderRadius: props.radius,
    overflow: "hidden"
  },

  inner: {
    height: "100%",
    width: "100%",
  }
});
