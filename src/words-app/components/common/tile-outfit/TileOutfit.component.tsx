import {
  DecorOverlayArcComponent
} from "../../../../core/components/decor-overlay-arc/DecorOverlayArcComponent.tsx";
import React, { ReactElement } from "react";
import { TileStyle } from "./TileStyle.models.ts";
import { Colors } from "../../../../style/Colors";
import { StyleSheet, View } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { GradientLayout } from "../../../../core/components/gradient-layout/GradientLayout.tsx";

export function TileOutfitComponent({ borderColor,colors, locations, overlay, start, end, additionalStyle }: TileStyle){
  const style = tileOutfitStyle(borderColor);

  return (
    <View style={[style.host, additionalStyle]}>
      <GradientLayout
        style={style.innerWrapper}
        model={Object.assign({}, ThemeManager.theme.categoryCard.defaultTileStyle, { colors, locations, start, end })}
      >
        { overlay ?
          <View style={style.contentWrapper}>
            <DecorOverlayArcComponent
              styling={{
                color: overlay.color,
                bottomPos: overlay.pos.bottom,
                rightPos: overlay.pos.right
              }} />
          </View> : <></>
        }</GradientLayout>
    </View>
  )
}

const tileOutfitStyle = (borderColor?: string) => StyleSheet.create({
  host:{
    borderWidth: 4,
    borderColor: borderColor,

    shadowColor: borderColor,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 10,
    borderRadius: 15,
    position: "absolute",
    height: "100%",
    width: "100%",
  },

  innerWrapper: {
    borderRightColor: Colors.white,
    borderRightWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    borderRadius: 11,
    display: "flex",
    height: "100%",
    width: "100%",
    overflow: "hidden"
  },

  contentWrapper: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden"
  },

  overlayWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  }
});
