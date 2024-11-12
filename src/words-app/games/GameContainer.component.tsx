/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GameModel } from "../app-data/models/GameModel";
import { appProducer } from "../app-data/store/AppProducer";
import { GameType } from "../app-data/models/GameType";
import NewWordsComponent from "./new-words/NewWords.component";
import { NewWordsModel } from "./new-words/NewWordsModel";
import { Logger } from "../../logger/Logger";

function GameContainerComponent(model: {model: GameModel}|undefined): React.JSX.Element {

  const logSource = "GameContainer";

  const [currentGameModel, setCurrentGameModel] = useState<GameModel|undefined>(undefined);

  useEffect(() => {
    updateGameModel();
  },[]);

  useEffect(() => {
    updateGameModel();
  }, [appProducer.getCurrentStepId()]);

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
    }
  }

  return (
    <View>
      {game}
    </View>

  );
}

export default GameContainerComponent;
