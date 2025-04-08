import { Pressable, StyleSheet } from "react-native";
import { TileOutfitComponent } from "../../common/tile-outfit/TileOutfit.component.tsx";
import React from "react";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export interface CardBackProps {
  onPress: () => void;
}

export function CardBack({onPress}: CardBackProps) {
  return (
    <Pressable onPress={() => onPress()} style={style.host}>
      <TileOutfitComponent
        colors={ThemeManager.theme.games.memoryGame.cardBack.colors}
        locations={ThemeManager.theme.games.memoryGame.cardBack.locations}
        borderColor={ThemeManager.theme.games.memoryGame.cardBack.borderColor}
        overlay={{ color: ThemeManager.theme.games.memoryGame.cardBack.overlayColor, pos: { bottom: 60, right: 60 }}} ></TileOutfitComponent>
    </Pressable>
  );
}

const style = StyleSheet.create({
  host: {
    borderRadius: 20,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  }
});
