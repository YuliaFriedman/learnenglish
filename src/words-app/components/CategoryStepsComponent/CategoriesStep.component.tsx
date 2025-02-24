import { CategoriesStepsStyling } from "./CategoriesSteps.styling.tsx";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StepProgressIcon } from "./StepProgressIcon.component.tsx";
import React, { useEffect, useRef } from "react";
import { StepModel } from "../../app-data/models/StepModel.ts";
import { TileOutfitComponent } from "../common/tile-outfit/TileOutfit.component.tsx";
import InjectionManager from "../../../core/services/InjectionManager.ts";
import { IAppProducer } from "../../app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "../../dependency-injection/DepInjectionTokens.ts";
import { CategoryStyle } from "../../app-data/models/CategoryModel.ts";

export interface CategoriesStepProps {
  step: StepModel;
  onPress: () => void;
  stepStyling: CategoryStyle | undefined;
}

export function CategoriesStepComponent({step, onPress, stepStyling}: CategoriesStepProps) {
  const appProducer = useRef<IAppProducer | null>(null);
  const selectedCategory = useRef(appProducer.current?.getCategory(appProducer.current?.getSelectedCategory()));

  useEffect(() => {
    initInjections();
  }, []);

  function initInjections(){
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }
  }




  return(
    <Pressable style={CategoriesStepStyling.step} key={step.id} onPress={() => onPress()}>
      <TileOutfitComponent colors={stepStyling?.colors} locations={stepStyling?.locations} borderColor={stepStyling?.borderColor}
        overlay={{ color: stepStyling?.overlayColor, pos: { bottom: 85, right: 73 }}}></TileOutfitComponent>
      <View>
        <Text style={CategoriesStepStyling.stepText}>{step.displayName}</Text>
        <StepProgressIcon step={step}  style={CategoriesStepStyling.progressIcon}></StepProgressIcon>
      </View>
    </Pressable>
  );
}

const CategoriesStepStyling = StyleSheet.create({
  step: {
    width: "20%",
    borderRadius: 5,
    position: "relative",
    margin: 10
  },

  contentWrapper: {
    margin: 20,
  },

  stepText: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
    marginBottom: 10
  },

  progressIcon: {
    position: "absolute",
    top: -10,
    left: -10
  },
});
