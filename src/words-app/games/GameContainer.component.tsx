/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GameModel } from "../app-data/models/GameModel";
import { appProducer } from "../app-data/store/AppProducer";
import { GameType } from "../app-data/models/GameType";
import NewWordsComponent from "./new-words/NewWords.component";
import { Logger } from "../../logger/Logger";
import { GameContainerStyling } from "./GameContainer.styling";
import SelectTranslationComponent from "./select-translation/SelectTranslation.component";
import { useSelector } from "react-redux";
import { AppState } from "../app-data/store/Store";
import SayWordComponent from "./say-word/SayWord.component";
import MatchTranslationComponent from "./match-translation/MatchTranslation.component";
import MatchTranslationComponent1 from "./match-translation/MatchTranslation1.component";

function GameContainerComponent(): React.JSX.Element {

  const logSource = "GameContainer";

  const [currentGameModel, setCurrentGameModel] = useState<GameModel|undefined>(undefined);

  const currentStepId = useSelector((state: AppState) => state.steps.currentStep);//appProducer.getCurrentStepId();

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

  let game = <></>;

  if(currentGameModel){
    switch (currentGameModel.type) {
      case GameType.NewWord:
        game = <NewWordsComponent model={currentGameModel.data}></NewWordsComponent>;
        break;
      case GameType.SelectTranslation:
        game = <SelectTranslationComponent model={currentGameModel.data}></SelectTranslationComponent>;
        break;
      case GameType.SayWord:
        game = <SayWordComponent model={currentGameModel.data}></SayWordComponent>;
        break;
      case GameType.MatchTranslation:
        game = <MatchTranslationComponent1 model={currentGameModel.data}></MatchTranslationComponent1>;
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
