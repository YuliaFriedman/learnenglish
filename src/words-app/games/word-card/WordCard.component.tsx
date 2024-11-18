/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { WordCardModel } from "./WordCardModel";
import { Logger } from "../../../logger/Logger";
import { images } from "../../app-data/ImagesManager";
import { WordCardStyling } from "./WordCard.styling";
import { AudioManager } from "../../../sound/AudioManager";
import { Languages } from "../../../app-data/language";

function WordCardComponent(args: {model: WordCardModel}): React.JSX.Element {

  const logSource = "WordCardComponent";

  useEffect(() => {
    if(args.model.shouldSayTheWord){
      playSound();
    }
  }, [args.model.shouldSayTheWord]);

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
    }
    else{
      Logger.log(logSource, "word card is not pressable " + args.model.word);
    }
  }

  return (
    <Pressable style={WordCardStyling.host} onPress={buttonPressed}>
      <Image source={require('./../../../../assets/images/ball.webp')} style={WordCardStyling.img} resizeMode={"contain"}/>
      <Text style={WordCardStyling.text}>{args.model.word}</Text>
    </Pressable>

  );
}

export default WordCardComponent;
