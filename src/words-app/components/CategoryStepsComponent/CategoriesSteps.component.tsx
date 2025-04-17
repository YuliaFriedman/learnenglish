/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { View } from "react-native";
import { CategoriesStepsStyling } from "./CategoriesSteps.styling";
import { StepModel } from "../../app-data/models/StepModel";
import { Logger } from "../../../logger/Logger";
import { CategoriesStepComponent } from "./CategoriesStep.component.tsx";
import { useSelector } from "react-redux";
import { currentCategorySelector, currentStepsSelector } from "../../app-data/store/AppSelectors.ts";
import { useServices } from "../../dependency-injection/ServicesContext.tsx";

function CategoriesStepsComponent(): React.JSX.Element {

  const logSource = "CategoriesStepsComponent";

  const currentCategory = useSelector(currentCategorySelector);
  const steps = useSelector(currentStepsSelector);
  const { navigationManager } = useServices();

  function buildStepView(step: StepModel, index: number){
      return <CategoriesStepComponent
        key={'step_' + index}
        step={step}
        onPress={() => navigateToStep(step)}
        stepStyling={currentCategory?.style}></CategoriesStepComponent>
  }

  function navigateToStep(step: StepModel){
    Logger.log(logSource, "Navigating to step: " + step.id);
    navigationManager.navigateToStep(step.id);
  }

  return (
    <View>
      {steps.map((group,index) => {
        return <View style={CategoriesStepsStyling.groupContainer} key={"group_" + index}>
          {buildStepView(group, index)}
        </View>
      })}
    </View>

  );
}

export default CategoriesStepsComponent;
