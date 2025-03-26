/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { CategoriesStepsStyling } from "./CategoriesSteps.styling";
import { StepModel } from "../../app-data/models/StepModel";
import { Category } from "../../app-data/models/CategoryModel";
import { Logger } from "../../../logger/Logger";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { GameType } from "../../app-data/models/GameType";
import { IAppProducer } from "../../app-data/store/IAppProducer.ts";
import InjectionManager from "../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../dependency-injection/DepInjectionTokens.ts";
import { CategoriesStepComponent } from "./CategoriesStep.component.tsx";
import { CategoriesExamStepComponent } from "./CategoriesExamStep.component.tsx";
import { RoutesListValues } from "../../app-data/models/routeValues.ts";
import { INavigationManager } from "../../navigation/INavigationManager.tsx";
import { useSelector } from "react-redux";
import { currentCategorySelector, currentStepsSelector } from "../../app-data/store/AppSelectors.ts";

function CategoriesStepsComponent(): React.JSX.Element {

  const logSource = "CategoriesStepsComponent";

  const currentCategory = useSelector(currentCategorySelector);
  const steps = useSelector(currentStepsSelector);
  const navigationManager = useRef<INavigationManager>( InjectionManager.useInjection<INavigationManager>(DepInjectionsTokens.NAVIGATION_MANAGER) );

  function createStepsGroups():StepModel[][]{
    Logger.log(logSource,"in createStepsGroups: category = " + currentCategory?.title + ", steps count = " + steps.length);
    return steps.reduce((groups:StepModel[][], item) => {
      const stepIsTest = item.game.type === GameType.Test;
      const prevStepWasTest = groups.length > 0 ? groups[groups.length - 1][0].game.type === GameType.Test : false;
      const firstStep = groups.length == 0;
      if (stepIsTest || prevStepWasTest || firstStep) {
        // Start a new group
        groups.push([item]);
      } else {
        // Add the item to the last group
        groups[groups.length - 1].push(item);
      }
      return groups;
    }, []);
  }

  let groups = createStepsGroups();
  Logger.log(logSource,"groups length = " + groups.length);

  function buildGroup(group: StepModel[]){
    return group.map((step,index) => {
      return <CategoriesStepComponent
        key={'step_' + index}
        step={step}
        onPress={() => navigateToStep(step)}
        stepStyling={currentCategory?.style}></CategoriesStepComponent>
    });
  }

  function buildExam(group: StepModel[]) {
    if(!group || group.length == 0){
      return <></>;
    }
    else{
      return <CategoriesExamStepComponent group={group[0]} onPress={() => navigateToStep(group[0])}></CategoriesExamStepComponent>
    }
  }

  function navigateToStep(step: StepModel){
    Logger.log(logSource, "Navigating to step: " + step.id);
    navigationManager.current.navigateToStep(step.id);
  }

  return (
    <View>
      {groups.map((group,index) => {
        return <View style={CategoriesStepsStyling.groupContainer} key={"group_" + index}>
          {group && group.length > 0 && group[0].game.type === GameType.Test ? buildExam(group) : buildGroup(group)}
        </View>
      })}
    </View>

  );
}

export default CategoriesStepsComponent;
