/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GameContainerStyling } from "./GameContainer.styling";
import { useSelector } from "react-redux";
import { Logger } from "../../../../logger/Logger";
import { GameModel } from "../../../app-data/models/GameModel";
import { currentStepIdSelector } from "../../../app-data/store/AppSelectors.ts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Game } from "../game/game.component.tsx";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";

const GameStack = createNativeStackNavigator();

function GameContainerComponent(): React.JSX.Element {

  const logSource = "GameContainer";

  const [currentGameModel, setCurrentGameModel] = useState<GameModel|undefined>(undefined);
  const currentStepId = useSelector(currentStepIdSelector);
  const { appProducer, navigationManager} = useServices();

  useEffect(() => {
    updateGameModel();
  },[]);

  useEffect(() => {
    Logger.log(logSource, "Current step changed");
    updateGameModel();
  }, [currentStepId]);

  function updateGameModel(){
    const currentStep = appProducer.getCurrentStep();
    Logger.log(logSource, "step changed: current step = " + currentStep?.displayName, false, currentStep?.game);
    setCurrentGameModel(currentStep?.game);
  }

  function goToNextGame(){
    navigationManager.goToNextStep();
  }

  return (
    <View style={GameContainerStyling.host}>
      {currentGameModel && <Game gameModel={currentGameModel} onCompleted={goToNextGame} />}
    </View>
  );
}

export default GameContainerComponent;
