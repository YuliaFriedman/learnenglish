import { View } from "react-native";
import { GameType } from "../../../app-data/models/GameType.ts";
import NewWordsComponent from "../new-words/NewWords.component.tsx";
import SelectTranslationComponent from "../select-translation/SelectTranslation.component.tsx";
import SayWordComponent from "../say-word/SayWord.component.tsx";
import MatchTranslationComponent from "../match-translation/MatchTranslation.component.tsx";
import React from "react";
import { GameStyling } from "./game.styling.tsx";
import { MemoryGame } from "../memory/MemoryGame.component.tsx";
import { useSelector } from "react-redux";
import { currentStepSelector } from "../../../app-data/store/AppSelectors.ts";
import { StepModel } from "../../../app-data/models/StepModel.ts";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";
import { NoGame } from "../no-game/no-game.component.tsx";

function Game(): React.JSX.Element {

  const { navigationManager} = useServices();
  const currentStep:StepModel = useSelector(currentStepSelector);

  let content = <NoGame></NoGame>;
  let gameFound = false;

  if(currentStep && currentStep.game){
    switch (currentStep.game.type) {
      case GameType.NewWord:
        content = <NewWordsComponent model={currentStep.game.data} onCompleted={goToNextGame}></NewWordsComponent>;
        gameFound = true;
        break;
      case GameType.SelectTranslation:
        content = <SelectTranslationComponent model={currentStep.game.data} onCompleted={goToNextGame}></SelectTranslationComponent>;
        gameFound = true;
        break;
      case GameType.SayWord:
        content = <SayWordComponent model={currentStep.game.data} onCompleted={goToNextGame}></SayWordComponent>;
        gameFound = true;
        break;
      case GameType.MatchTranslation:
        content = <MatchTranslationComponent model={currentStep.game.data} onCompleted={goToNextGame}></MatchTranslationComponent>;
        gameFound = true;
        break;
      case GameType.Memory:
        content = <MemoryGame model={currentStep.game.data} onCompleted={goToNextGame}></MemoryGame>;
        gameFound = true;
        break;
    }
  }

  if(gameFound){
    content = <View style={GameStyling.host}>{content}</View>
  }

  function goToNextGame(){
    navigationManager.goToNextStep();
  }

  return (
    <>{content}</>
  )
}

export default Game;
