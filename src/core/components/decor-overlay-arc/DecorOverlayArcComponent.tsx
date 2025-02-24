import { StyleSheet, View } from "react-native";
import { fromPercentToPixelsWidth } from "../../../style/dimentions.ts";
import React from "react";
import { ThemeManager } from "../../../words-app/style/ThemeManager.ts";
import RadialGradient from "react-native-radial-gradient";

export interface DecorOverlayArcWrapperStyling {
  bottomPos: number;
  rightPos: number;
  color?: string;
}

export interface DecorOverlayArcWrapperProps{
  styling: DecorOverlayArcWrapperStyling;
}

export function DecorOverlayArcComponent({styling}:DecorOverlayArcWrapperProps){
  const style = DecorOVerlayArcWrapperStyling(styling)

  console.log("DecorOverlayArcWrapperComponent", styling);

  return (
    <View style={style.decorOverlayWrapper}>
      <RadialGradient style={style.arc}
                      colors={['rgba(255, 255, 255, 0)', styling.color || ThemeManager.theme.categoryCard.defaultCardStyle.overlayColor]}
                      stops={[0, 1]}
                      center={[100,100]}
                      radius={200}
      ></RadialGradient>
    </View>
  )
}

const DecorOVerlayArcWrapperStyling = (props:DecorOverlayArcWrapperStyling) => StyleSheet.create({
  decorOverlayWrapper: {
    position: "absolute",
    right: -1*fromPercentToPixelsWidth(props.rightPos),
    bottom: -1*fromPercentToPixelsWidth(props.bottomPos),
    width: fromPercentToPixelsWidth(100),
    height: fromPercentToPixelsWidth(100),
    overflow: "hidden",
    borderRadius: fromPercentToPixelsWidth(100),
  },

  arc: {
    height: "100%",
    width: "100%",
  }
});

