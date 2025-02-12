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
import { AudioManager } from "../../../../sound/AudioManager";
import { Languages } from "../../../../app-data/language";
import { AnswerStatus } from "../../../common-models/AnswerStatus";
import draggableComponent from "../../../common-components/draggable/draggable.component.tsx";
import { DraggablePressable } from "../../../common-components/draggable/draggablePressable.tsx";

function WordCardComponent(args: {model: WordCardModel }): React.JSX.Element {

  const logSource = "WordCardComponent";

  useEffect(() => {draggableComponent
    if(args?.model?.shouldSayTheWord){
      playSound();
    }
  }, [args?.model?.shouldSayTheWord]);

  function playSound(){
    if(args?.model){
      Logger.log(logSource, "Playing sound " + args?.model?.word + "(" + args?.model?.language + ") - img = " + args?.model?.image);
      if(args?.model?.onSpeakStarted){
        args?.model?.onSpeakStarted();
      }
      AudioManager.playSound({
        text: args.model.word,
        soundKey: args.model.sound,
        language: args.model.language
      }).then(() => {
        Logger.log(logSource, "Play sound completed for word " + args.model.word);
        if(args.model?.onSpeakCompleted){
          args.model.onSpeakCompleted();
        }
      });
    }
  }

  function buttonPressed(){
    if(args?.model?.pressable){
      playSound();
      if(args.model.onPressed){
        args.model.onPressed();
      }
    }
    else{
      Logger.log(logSource, "word card is not pressable " + args.model.word);
    }
  }

  return (
    <DraggablePressable onPress={buttonPressed}>
      <View
        style={[
          WordCardStyling.host,
          args?.model?.isSelected && WordCardStyling.selectedWordCard,
          args?.model?.answerStatus === AnswerStatus.wrong && WordCardStyling.incorrectWordCard,
          args?.model?.answerStatus === AnswerStatus.correct && WordCardStyling.correctWordCard,
        ]}
      >
        <View
          style={[
            WordCardStyling.imageContainer,
            !args?.model?.imgVisible && WordCardStyling.invisibleImg
          ]}
        >
          <Image
            source={images[args?.model?.image]}
            style={WordCardStyling.img}
            resizeMode={"center"}
          />
        </View>
        {args?.model?.showText && <Text style={WordCardStyling.text}>{args.model.word}</Text>}
      </View>
    </DraggablePressable>

  );
}

export default WordCardComponent;
