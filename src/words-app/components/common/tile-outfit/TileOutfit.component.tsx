import {
  DecorOverlayArcWrapperComponent
} from "../../../common-components/decor-overlay-arc/DecorOverlayArcWrapper.component.tsx";
import React, { ReactElement } from "react";
import LinearGradient from "react-native-linear-gradient";
import { TileOutfitProps, TileStyle } from "./TileStyle.models.ts";
import { Colors } from "../../../../style/Colors";
import { StyleSheet, View } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export function TileOutfitComponent({ children,tileStyle }: TileOutfitProps){
  const style = tileOutfitStyle(tileStyle);

  return (
    <View style={style.host}>
      <LinearGradient
        style={style.innerWrapper}

        colors={tileStyle.colors || ThemeManager.theme.categoryCard.defaultTileStyle.bgColors}
        locations={tileStyle.locations || ThemeManager.theme.categoryCard.defaultTileStyle.bgLocations}
        start={ThemeManager.theme.categoryCard.defaultTileStyle.start}
        end={ThemeManager.theme.categoryCard.defaultTileStyle.end}
      >
        <DecorOverlayArcWrapperComponent styling={{radius: 100, color: tileStyle.overlayColor, leftPos: 60, rightPos: 60}}></DecorOverlayArcWrapperComponent>
        {children}
     </LinearGradient>
    </View>
  )
}

const tileOutfitStyle = (tileStyle: TileStyle) => StyleSheet.create({
  host:{
    borderWidth: 4,
    borderColor: tileStyle.borderColor,

    shadowColor: tileStyle.borderColor,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 10,
    borderRadius: 15,
  },

  innerWrapper: {
    borderRightColor: Colors.white,
    borderRightWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    borderRadius: 11,
    overflow: "hidden"

  },
});
