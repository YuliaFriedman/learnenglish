/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View, ViewStyle } from "react-native";
import { WordTextCardModel } from "./WordTextCardModel";
import { Logger } from "../../../../logger/Logger";
import { WordTextCardStyling } from "./WordTextCard.styling";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { IAudioManager } from "../../../../sound/IAudioManager.ts";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { GradientBorder } from "../../../../core/components/gradient-border/GradienBorder.tsx";
import { CardText } from "../../common/card-text/CardText.tsx";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";

export interface WordTextCardComponentProps {
  model: WordTextCardModel;
  onSpeakStarted?: () => void;
  onSpeakCompleted?: () => void;
  onPressed?: () => void;
  style?: ViewStyle;
}


function WordTextCardComponent({model, onSpeakStarted, onSpeakCompleted, onPressed, style}: WordTextCardComponentProps): React.JSX.Element {

  const logSource = "WordTextCardComponent";
  const { audioManager } = useServices();


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
    audioManager.playSound({
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

  const wordTextCardStyling = WordTextCardStyling(ThemeManager.theme.games.textCard.backgroundColor);

  return (
    <Pressable onPress={buttonPressed}>
      <GradientBorder style={wordTextCardStyling.host} innerStyle={wordTextCardStyling.innerContainer}
        model={{
          colors: ThemeManager.theme.games.textCard.borderColors,
          start:ThemeManager.theme.games.textCard.borderStart,
          end:ThemeManager.theme.games.textCard.borderEnd
        }}>
        <View style={[wordTextCardStyling.contentWrapper,style]}>
          { model?.showMic && <Icon name="microphone" size={30} color="blue"/> }
          <CardText style={wordTextCardStyling.text}>{model.word}</CardText>
        </View>
      </GradientBorder>
     </Pressable>

  );
}

export default WordTextCardComponent;
