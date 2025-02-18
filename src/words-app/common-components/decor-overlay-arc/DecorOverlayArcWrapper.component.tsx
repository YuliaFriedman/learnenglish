import { AnimatableNumericValue, DimensionValue } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { StyleSheet, View } from "react-native";
import { DecorOverlayArc } from "./DecorOverlayArc.component.tsx";
import { fromPercentToPixels } from "../../../style/dimentions.ts";
import React from "react";
import { ThemeManager } from "../../style/ThemeManager.ts";

export interface DecorOverlayArcWrapperStyling {
  leftPos: DimensionValue;
  rightPos: DimensionValue;
  color?: string;
  radius: AnimatableNumericValue;
}

export interface DecorOverlayArcWrapperProps{
  styling: DecorOverlayArcWrapperStyling;
}

export function DecorOverlayArcWrapperComponent({styling}:DecorOverlayArcWrapperProps){
  const style = DecorOVerlayArcWrapperStyling(styling)

  return (
    <View style={style.decorOverlayWrapper}>
      <DecorOverlayArc
        radius={fromPercentToPixels(styling.radius)}
        color={styling.color || ThemeManager.theme.categoryCard.defaultCardStyle.overlayColor}></DecorOverlayArc>
    </View>
  )
}

const DecorOVerlayArcWrapperStyling = (props:DecorOverlayArcWrapperStyling) => StyleSheet.create({
  decorOverlayWrapper: {
    position: "absolute",
    right: -1*fromPercentToPixels(props.rightPos),
    bottom: -1*fromPercentToPixels(props.leftPos),
    width: fromPercentToPixels(100),
    height: fromPercentToPixels(100),
  }
});

