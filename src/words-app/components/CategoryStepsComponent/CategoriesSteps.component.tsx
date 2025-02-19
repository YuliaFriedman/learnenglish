/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CategoriesStepsStyling } from "./CategoriesSteps.styling";
import { StepModel, StepStatus } from "../../app-data/models/StepModel";
import { Category } from "../../app-data/models/CategoryModel";
import { Logger } from "../../../logger/Logger";
import Icon from "react-native-vector-icons/FontAwesome";
import { GameType } from "../../app-data/models/GameType";
import { navigatorService } from "../../../routing/AppNavigatorService";
import { WordsAppPages } from "../../navigation/WordsAppPages";
import { IAppProducer } from "../../app-data/store/IAppProducer.ts";
import InjectionManager from "../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../dependency-injection/DepInjectionTokens.ts";

function CategoriesStepsComponent(): React.JSX.Element {

  const logSource = "CategoriesStepsComponent";

  const [currentCategory, setCurrentCategory] = useState<Category|undefined>(undefined);
  const [steps, setSteps] = useState<StepModel[]>([]);
  const appProducer = useRef<IAppProducer | null>(null);

  useEffect(() => {
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }
  }, []);

  useEffect(() => {
    setCurrentCategory(appProducer.current?.getCategory(appProducer.current?.getSelectedCategory()));
  }, [appProducer.current?.getSelectedCategory()]);

  useEffect(() => {
    if(currentCategory && currentCategory?.id) {
      setSteps(appProducer.current?.getCurrentSteps() || []);
    }
  }, [currentCategory]);

  function getStarIcon(status:StepStatus) {
    switch (status) {
      case StepStatus.Idle:
        return <Icon name="star-o" size={30} color="black"/>
      case StepStatus.Skipped:
        return <Icon name="star-half-empty" size={30} color="black"/>
      case StepStatus.Completed:
        return <Icon name="star" size={30} color="black"/>
    }
  }

  function createStepsGroups():StepModel[][]{
    Logger.log(logSource,"in createStepsGroups: category = " + currentCategory?.title + ", steps count = " + steps.length);
    return steps.reduce((groups, item) => {
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

  /*if(group.length == 1 && group[0].gameType === GameType.Test){

  }*/

  function buildGroup(group: StepModel[]){
    return group.map((step,index) => {
      return <Pressable style={CategoriesStepsStyling.step} key={step.id} onPress={() => navigateToStep(step)}>
        <Text style={CategoriesStepsStyling.stepText}>{step.displayName}</Text>
        <View style={CategoriesStepsStyling.starIcon}>
          <Icon name="star" size={30} color="white"/>
        </View>
        <View style={CategoriesStepsStyling.starIcon}>
          {getStarIcon(step.status)}
        </View>
      </Pressable>
    })
  }

  function buildExam(group: StepModel[]) {
    if(!group || group.length == 0){
      return <></>;
    }
    else{
      return <Pressable onPress={() => navigateToStep(group[0])}  key={group[0].id}>
        <Icon name="edit" size={50} color="black"/>
      </Pressable>
    }
  }

  function navigateToStep(step: StepModel){
    appProducer.current?.setCurrentStep(step.id);
    navigatorService.navigate(WordsAppPages.game);
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
