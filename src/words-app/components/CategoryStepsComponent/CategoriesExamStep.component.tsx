// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { StepModel } from "../../app-data/models/StepModel.ts";
import { TileOutfitComponent } from "../common/tile-outfit/TileOutfit.component.tsx";
import { ThemeManager } from "../../style/ThemeManager.ts";

interface CategoriesExamStepProps {
  group: StepModel;
  onPress: (step: any) => void | undefined;
}

export function CategoriesExamStepComponent({group, onPress}: CategoriesExamStepProps){

  return(
    <Pressable onPress={() => onPress(group)} style={examTileStyling.host}>
      <TileOutfitComponent
        colors={ThemeManager.theme.examTileStyling.bgColors}
        locations={ThemeManager.theme.examTileStyling.bgLocations}
        borderColor={ThemeManager.theme.examTileStyling.borderColor}
        overlay={{ color: ThemeManager.theme.examTileStyling.overlayColor, pos: { bottom: 80, right: 73 }}}></TileOutfitComponent>
      <View style={examTileStyling.content}>
        <Icon name="edit" size={50} color="white"/>
      </View>
    </Pressable>
  );
}


const examTileStyling = StyleSheet.create({
  host: {
    position: "relative",
  },
  content: {
    margin: 20
  }
})
