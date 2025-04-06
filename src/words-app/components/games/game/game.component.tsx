import { View } from "react-native";
import { GameType } from "../../../app-data/models/GameType.ts";
import NewWordsComponent from "../new-words/NewWords.component.tsx";
import SelectTranslationComponent from "../select-translation/SelectTranslation.component.tsx";
import SayWordComponent from "../say-word/SayWord.component.tsx";
import MatchTranslationComponent from "../match-translation/MatchTranslation.component.tsx";
import React from "react";
import { GameModel } from "../../../app-data/models/GameModel.ts";
import { GameStyling } from "./game.styling.tsx";
import { MemoryGame } from "../memory/MemoryGame.component.tsx";

export interface GameProps {
  gameModel: GameModel;
  onCompleted: () => void
}

export function Game({gameModel, onCompleted}: GameProps){

  let game = <></>;

  if(gameModel){
    switch (gameModel.type) {
      case GameType.NewWord:
        game = <NewWordsComponent model={gameModel.data} onCompleted={onCompleted}></NewWordsComponent>;
        break;
      case GameType.SelectTranslation:
        game = <SelectTranslationComponent model={gameModel.data} onCompleted={onCompleted}></SelectTranslationComponent>;
        break;
      case GameType.SayWord:
        game = <SayWordComponent model={gameModel.data} onCompleted={onCompleted}></SayWordComponent>;
        break;
      case GameType.MatchTranslation:
        game = <MatchTranslationComponent model={gameModel.data} onCompleted={onCompleted}></MatchTranslationComponent>;
        break;
      case GameType.Memory:
        game = <MemoryGame model={gameModel.data} onCompleted={onCompleted}></MemoryGame>;
        break;
    }
  }

  return (
    <View style={GameStyling.host}>
      {game}
    </View>
  )
}
