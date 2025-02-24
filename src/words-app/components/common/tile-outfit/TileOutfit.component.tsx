import {
  DecorOverlayArcComponent
} from "../../../../core/components/decor-overlay-arc/DecorOverlayArcComponent.tsx";
import React, { ReactElement } from "react";
import LinearGradient from "react-native-linear-gradient";
import { TileOutfitProps, TileStyle } from "./TileStyle.models.ts";
import { Colors } from "../../../../style/Colors";
import { StyleSheet, View } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export function TileOutfitComponent({ borderColor,colors, locations, overlay, start, end }: TileStyle){
  const style = tileOutfitStyle(borderColor);
  console.log("colors: " + colors + ",color length: " + colors?.length);
  console.log("positions: " + locations + ",locations length: " + locations?.length);
  return (
    <View style={style.host}>
      <LinearGradient
        style={style.innerWrapper}

        colors={colors || ThemeManager.theme.categoryCard.defaultTileStyle.bgColors}
        locations={locations || ThemeManager.theme.categoryCard.defaultTileStyle.bgLocations}
        start={start || ThemeManager.theme.categoryCard.defaultTileStyle.start}
        end={end || ThemeManager.theme.categoryCard.defaultTileStyle.end}
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
        }
        </LinearGradient>
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
