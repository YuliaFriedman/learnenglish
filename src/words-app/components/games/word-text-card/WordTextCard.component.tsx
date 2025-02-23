/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { WordTextCardModel } from "./WordTextCardModel";
import { Logger } from "../../../../logger/Logger";
import { WordTextCardStyling } from "./WordTextCard.styling";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { IAudioManager } from "../../../../sound/IAudioManager.ts";

export interface WordTextCardComponentProps {
  model: WordTextCardModel;
  onSpeakStarted?: () => void,
  onSpeakCompleted?: () => void,
  onPressed?: () => void
}


function WordTextCardComponent({model, onSpeakStarted, onSpeakCompleted, onPressed}: WordTextCardComponentProps): React.JSX.Element {

  const logSource = "WordTextCardComponent";
  const audioManager = useRef<IAudioManager | null>(null);

  useEffect(() => {
    initInjections();
  }, []);

  useEffect(() => {
    if(model?.shouldSayTheWord){
      playSound();
    }
  }, [model?.shouldSayTheWord]);

  function initInjections(){
    if(!audioManager.current){
      audioManager.current = InjectionManager.useInjection<IAudioManager>(DepInjectionsTokens.AUDIO_MANAGER_TOKEN);
    }
  }

  function playSound(){
    Logger.log(logSource, "Playing sound " + model.word + "(" + model.language + ")");
    if(onSpeakStarted){
      onSpeakStarted();
    }
    audioManager.current?.playSound({
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
