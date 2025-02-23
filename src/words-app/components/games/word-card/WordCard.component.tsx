/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { WordCardModel } from "./WordCardModel";
import { Logger } from "../../../../logger/Logger";
import { images } from "../../../app-data/ImagesManager";
import { WordCardStyling } from "./WordCard.styling";
import { Languages } from "../../../../app-data/language";
import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import draggableComponent from "../../../../core/components/draggable/draggable.component.tsx";
import { DraggablePressable } from "../../../../core/components/draggable/draggablePressable.tsx";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { IAudioManager } from "../../../../sound/IAudioManager.ts";

export interface WordCardComponentProps {
  model: WordCardModel;
  onSpeakStarted?: () => void,
  onSpeakCompleted?: () => void,
  onPressed?: () => void
}

function WordCardComponent({ model, onSpeakStarted, onSpeakCompleted, onPressed }:WordCardComponentProps): React.JSX.Element {

  const logSource = "WordCardComponent";
  const audioManager = useRef<IAudioManager | null>(null);

  useEffect(() => {
    initInjections();
  }, []);

  useEffect(() => {draggableComponent
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
    if(model){
      Logger.log(logSource, "Playing sound " + model?.word + "(" + model?.language + ") - img = " + model?.image);
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
  }

  function buttonPressed(){
    if(model?.pressable){
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
    <DraggablePressable onPress={buttonPressed}>
      <View
        style={[
          WordCardStyling.host,
          model?.isSelected && WordCardStyling.selectedWordCard,
          model?.answerStatus === AnswerStatus.wrong && WordCardStyling.incorrectWordCard,
          model?.answerStatus === AnswerStatus.correct && WordCardStyling.correctWordCard,
        ]}
      >
        <View
          style={[
            WordCardStyling.imageContainer,
            !model?.imgVisible && WordCardStyling.invisibleImg
          ]}
        >
          <Image
            source={images[model?.image]}
            style={WordCardStyling.img}
            resizeMode={"center"}
          />
        </View>
        {model?.showText && <Text style={WordCardStyling.text}>{model.word}</Text>}
      </View>
    </DraggablePressable>

  );
}

export default WordCardComponent;
