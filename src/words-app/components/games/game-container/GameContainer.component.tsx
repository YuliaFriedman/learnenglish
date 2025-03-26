/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { GameContainerStyling } from "./GameContainer.styling";
import { useSelector } from "react-redux";
import { Logger } from "../../../../logger/Logger";
import { GameModel } from "../../../app-data/models/GameModel";
import { GameType } from "../../../app-data/models/GameType";
import MatchTranslationComponent from "../match-translation/MatchTranslation.component";
import NewWordsComponent from "../new-words/NewWords.component";
import SayWordComponent from "../say-word/SayWord.component";
import SelectTranslationComponent from "../select-translation/SelectTranslation.component";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { currentGameSelector, currentStepIdSelector } from "../../../app-data/store/AppSelectors.ts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesListValues } from "../../../app-data/models/routeValues.ts";
import { NoGame } from "../no-game/no-game.component.tsx";
import { INavigationManager } from "../../../navigation/INavigationManager.tsx";
import { Game } from "../game/game.component.tsx";

const GameStack = createNativeStackNavigator();

function GameContainerComponent(): React.JSX.Element {

  const logSource = "GameContainer";

  const [currentGameModel, setCurrentGameModel] = useState<GameModel|undefined>(undefined);
  const currentStepId = useSelector(currentStepIdSelector);
  const appProducer = useRef<IAppProducer>(InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN));
  const navigationManager = useRef<INavigationManager>(InjectionManager.useInjection<INavigationManager>(DepInjectionsTokens.NAVIGATION_MANAGER));

  useEffect(() => {
    updateGameModel();
  },[]);

  useEffect(() => {
    Logger.log(logSource, "Current step changed");
    updateGameModel();
  }, [currentStepId]);

  function updateGameModel(){
    const currentStep = appProducer.current?.getCurrentStep();
    Logger.log(logSource, "step changed: current step = " + currentStep?.displayName, false, currentStep?.game);
    setCurrentGameModel(currentStep?.game);
  }

  function goToNextGame(){
    navigationManager.current?.goToNextStep();
  }

  // useEffect(() => {
  //   Logger.log(logSource, "currentGameModel changed");
  //   if (currentGameModel) {
  //     const route = fromGameTypeToRoute();
  //     if(route){
  //       Logger.log(logSource, "Navigating to route: " + route);
  //       appProducer.current.setNestedNavigationRoute(RoutesListValues.game, { screen: route });
  //     }
  //   }
  // }, [currentGameModel]);

  // function fromGameTypeToRoute(): RoutesListValues | undefined{
  //   if (currentGameModel) {
  //     switch (currentGameModel.type) {
  //       case GameType.NewWord:
  //         return RoutesListValues.newWord;
  //       case GameType.SelectTranslation:
  //         return RoutesListValues.selectTranslation;
  //       case GameType.SayWord:
  //         return RoutesListValues.sayWord;
  //       case GameType.MatchTranslation:
  //         return RoutesListValues.matchTranslation;
  //     }
  //   }
  // }

  // let game = <></>;
  //
  // if(currentGameModel){
  //   switch (currentGameModel.type) {
  //     case GameType.NewWord:
  //       game = <NewWordsComponent model={currentGameModel.data} onCompleted={goToNextGame}></NewWordsComponent>;
  //       break;
  //     case GameType.SelectTranslation:
  //       game = <SelectTranslationComponent model={currentGameModel.data} onCompleted={goToNextGame}></SelectTranslationComponent>;
  //       break;
  //     case GameType.SayWord:
  //       game = <SayWordComponent model={currentGameModel.data} onCompleted={goToNextGame}></SayWordComponent>;
  //       break;
  //     case GameType.MatchTranslation:
  //       game = <MatchTranslationComponent model={currentGameModel.data} onCompleted={goToNextGame}></MatchTranslationComponent>;
  //       break;
  //   }
  // }


  return (
    <View style={GameContainerStyling.host}>
      {currentGameModel && <Game gameModel={currentGameModel} onCompleted={goToNextGame} />}
    </View>
  );
}

export default GameContainerComponent;
