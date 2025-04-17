import { StyleSheet, Text, View } from "react-native";
import { StepProgressIcon } from "./StepProgressIcon.component.tsx";
import React from "react";
import { StepModel } from "../../app-data/models/StepModel.ts";
import { TileOutfitComponent } from "../common/tile-outfit/TileOutfit.component.tsx";
import { CategoryStyle } from "../../app-data/models/CategoryModel.ts";
import {
  PressableWithAnimation
} from "../../../core/components/animations/pressable-with-animatin/PressableWithAnimation.tsx";

export interface CategoriesStepProps {
  step: StepModel;
  onPress: () => void;
  stepStyling: CategoryStyle | undefined;
}

export function CategoriesStepComponent({step, onPress, stepStyling}: CategoriesStepProps) {

  return(
    <PressableWithAnimation style={CategoriesStepStyling.step} key={step.id} onPress={() => onPress()}>
        <TileOutfitComponent colors={stepStyling?.colors} locations={stepStyling?.locations} borderColor={stepStyling?.borderColor}
          overlay={{ color: stepStyling?.overlayColor, pos: { bottom: 85, right: 73 }}}></TileOutfitComponent>
        <View>
          <Text style={CategoriesStepStyling.stepText}>{step.displayName}</Text>
          <StepProgressIcon step={step}  style={CategoriesStepStyling.progressIcon}></StepProgressIcon>
        </View>
    </PressableWithAnimation>
  );
}

const CategoriesStepStyling = StyleSheet.create({
  step: {
    width: "22%",
    borderRadius: 5,
    position: "relative",
    margin: 5,
    marginBottom: 20
  },

  contentWrapper: {
    margin: 20,
  },

  stepText: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold"

  },

  progressIcon: {
    position: "absolute",
    top: -10,
    left: -10
  },
});
