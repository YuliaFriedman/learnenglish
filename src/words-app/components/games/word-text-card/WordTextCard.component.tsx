/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { WordTextCardModel } from "./WordTextCardModel";
import { Logger } from "../../../../logger/Logger";
import { WordTextCardStyling } from "./WordTextCard.styling";
import { AudioManager } from "../../../../sound/AudioManager";
import Icon from "react-native-vector-icons/FontAwesome";

export interface WordTextCardComponentProps {
  model: WordTextCardModel;
  onSpeakStarted?: () => void,
  onSpeakCompleted?: () => void,
  onPressed?: () => void
}


function WordTextCardComponent({model, onSpeakStarted, onSpeakCompleted, onPressed}: WordTextCardComponentProps): React.JSX.Element {

  const logSource = "WordTextCardComponent";

  useEffect(() => {
    if(model?.shouldSayTheWord){
      playSound();
    }
  }, [model?.shouldSayTheWord]);

  function playSound(){
    Logger.log(logSource, "Playing sound " + model.word + "(" + model.language + ")");
    if(onSpeakStarted){
      onSpeakStarted();
    }
    AudioManager.playSound({
      text: model.word,
      soundKey: model.sound,
      language: model.language
    }).then(() => {
      Logger.log(logSource, "Play sound completed for word " + model.word);
      if(onSpeakCompleted){
        onSpeakCompleted();
      }
    });
  }

  function buttonPressed(){
    if(model.pressable){
      playSound();
      if(onPressed){
        onPressed();
      }
    }
    else{
      Logger.log(logSource, "word card is not pressable " + model.word);
    }
  }

  return (
    <Pressable style={WordTextCardStyling.host} onPress={buttonPressed}>
      {model?.showMic && <Icon name="microphone" size={30} color="blue"/>}
      <Text style={WordTextCardStyling.text}>{model.word}</Text>
    </Pressable>

  );
}

export default WordTextCardComponent;
