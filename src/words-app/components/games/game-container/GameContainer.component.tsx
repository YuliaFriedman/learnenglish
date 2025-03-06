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
import { AppState } from "../../../app-data/store/Store.ts";

function GameContainerComponent(): React.JSX.Element {

  const logSource = "GameContainer";

  const [currentGameModel, setCurrentGameModel] = useState<GameModel|undefined>(undefined);

  const currentStepId = useSelector((state: AppState) => state.steps.currentStep);//appProducer.getCurrentStepId();
  const appProducer = useRef<IAppProducer | null>(null);

  useEffect(() => {
    initInjections();
    updateGameModel();
  },[]);

  useEffect(() => {
    Logger.log(logSource, "Current step changed");
    updateGameModel();
  }, [currentStepId]);

  function initInjections(){
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }
  }

  function updateGameModel(){
    const currentStep = appProducer.current?.getCurrentStep();
    Logger.log(logSource, "step changed: current step = " + currentStep?.displayName, false, currentStep?.game);
    setCurrentGameModel(currentStep?.game);
  }

  function goToNextGame(){
    appProducer.current?.setNextStep();
  }

  let game = <></>;

  if(currentGameModel){
    switch (currentGameModel.type) {
      case GameType.NewWord:
        game = <NewWordsComponent model={currentGameModel.data} onCompleted={goToNextGame}></NewWordsComponent>;
        break;
      case GameType.SelectTranslation:
        game = <SelectTranslationComponent model={currentGameModel.data} onCompleted={goToNextGame}></SelectTranslationComponent>;
        break;
      case GameType.SayWord:
        game = <SayWordComponent model={currentGameModel.data} onCompleted={goToNextGame}></SayWordComponent>;
        break;
      case GameType.MatchTranslation:
        game = <MatchTranslationComponent model={currentGameModel.data} onCompleted={goToNextGame}></MatchTranslationComponent>;
        break;
    }
  }

  return (
    <View style={GameContainerStyling.host}>
      {game}
    </View>

  );
}

export default GameContainerComponent;
