/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { WordTextCardModel } from "./WordTextCardModel";
import { Logger } from "../../../logger/Logger";
import { images } from "../../app-data/ImagesManager";
import { WordTextCardStyling } from "./WordTextCard.styling";
import { AudioManager } from "../../../sound/AudioManager";
import { Languages } from "../../../app-data/language";
import Icon from "react-native-vector-icons/FontAwesome";

function WordTextCardComponent(args: {model: WordTextCardModel}): React.JSX.Element {

  const logSource = "WordTextCardComponent";

  useEffect(() => {
    if(args.model?.shouldSayTheWord){
      playSound();
    }
  }, [args.model?.shouldSayTheWord]);

  function playSound(){
    Logger.log(logSource, "Playing sound " + args.model.word + "(" + args.model.language + ")");
    if(args.model?.onSpeakStarted){
      args.model.onSpeakStarted();
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

  function buttonPressed(){
    if(args.model.pressable){
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
    <Pressable style={WordTextCardStyling.host} onPress={buttonPressed}>
      <Icon name="microphone" size={30} color="blue"/>
      <Text style={WordTextCardStyling.text}>{args.model.word}</Text>
    </Pressable>

  );
}

export default WordTextCardComponent;
