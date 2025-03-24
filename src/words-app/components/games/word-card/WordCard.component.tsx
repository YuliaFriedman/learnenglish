/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View, ViewStyle } from "react-native";
import { WordCardModel } from "./WordCardModel";
import { Logger } from "../../../../logger/Logger";
import { images } from "../../../app-data/ImagesManager";
import { WordCardStyling } from "./WordCard.styling";
import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import { DraggablePressable } from "../../../../core/components/draggable/draggablePressable.tsx";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { IAudioManager } from "../../../../sound/IAudioManager.ts";
import { TileOutfitComponent } from "../../common/tile-outfit/TileOutfit.component.tsx";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { GradientBorder } from "../../../../core/components/gradient-border/GradienBorder.tsx";
import { CardText } from "../../common/card-text/CardText.tsx";
import { Colors } from "../../../../style/Colors";
import { animationStyles } from "../../../../core/styles/animations.tsx";

export interface CardStyle {
  borderColors: string[];
  borderColorSelected: string[];
  borderColorCorrect: string[];
  borderColorWrong: string[];

  backgroundColor: string;
  backgroundColorSelected: string;
  backgroundColorCorrect: string;
  backgroundColorWrong: string;

  shadow: string;
}

export interface WordCardComponentProps {
  model: WordCardModel;
  style?: ViewStyle;
  cardStyle?: Partial<CardStyle>;
  onSpeakStarted?: () => void,
  onSpeakCompleted?: () => void,
  onPressed?: () => void
}

function WordCardComponent({ model, style, onSpeakStarted, onSpeakCompleted, onPressed, cardStyle }:WordCardComponentProps): React.JSX.Element {

  const logSource = "WordCardComponent";
  const audioManager = useRef<IAudioManager>(
    InjectionManager.useInjection<IAudioManager>(DepInjectionsTokens.AUDIO_MANAGER_TOKEN)
  );
  const [borderColor, setBorderColor] = useState(getCardBorder(cardStyle));
  const [backgroundColor, setBackgroundColor] = useState<string>(getCardBackground(cardStyle));
  const [currentCardStyle, setCurrentCardStyle] = useState<CardStyle>(ThemeManager.theme.games.card)
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if(model?.shouldSayTheWord){
      playSound();
    }
  }, [model?.shouldSayTheWord]);

  useEffect(() => {
    const currentStyle = calculateStyle();
    setCurrentCardStyle(currentStyle);
  }, [cardStyle]);

  useEffect(() => {
    setBorderColor(getCardBorder());
    const bg = getCardBackground();
    // @ts-ignore
    setBackgroundColor(bg);
  }, [model?.answerStatus, model?.isSelected, currentCardStyle])

  function calculateStyle(){
    return Object.assign({...ThemeManager.theme.games.card}, model?.selectable ? ThemeManager.theme.games.selectableCard : {}, cardStyle);
  }

  function playSound(){
    if(model){
      Logger.log(logSource, `Playing sound ${model?.word} (${model?.language}) img = ${model?.image} has audio manager = ${audioManager.current?.playSound}`);
      if(onSpeakStarted){
        onSpeakStarted();
      }
      //audioManager.current?.test();
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
    Logger.log(logSource, `WordCard pressed ${model?.word}`);
    setIsPressed(true);
    if(model?.pressable){
      playSound();
      if(onPressed){
        onPressed();
      }
    }
    else{
      Logger.log(logSource, "word card is not pressable " + model.word);
    }
    setTimeout(() => setIsPressed(false), 200);
  }

  function getCardBorder(style?:Partial<CardStyle>){
    const styleToUse = currentCardStyle || style;
    const defaultBorder = [Colors.$transparent, Colors.$transparent];

    if (!styleToUse) {
      return defaultBorder;
    }

    if (model?.answerStatus === AnswerStatus.wrong) {
      return styleToUse.borderColorWrong ?? defaultBorder;
    }
    if (model?.answerStatus === AnswerStatus.correct) {
      return styleToUse.borderColorCorrect ?? defaultBorder;
    }
    if (model?.isSelected) {
      return styleToUse.borderColorSelected ?? defaultBorder;
    }
    return styleToUse.borderColors ?? defaultBorder;
  }

  function getCardBackground(style?:Partial<CardStyle>):string {
    const styleToUse = currentCardStyle || style;
    const defaultBg = Colors.$transparent;
    if (!styleToUse) {
      return defaultBg;
    }

    if (model?.answerStatus === AnswerStatus.wrong) {
      return styleToUse.backgroundColorWrong ?? defaultBg;
    }
    if (model?.answerStatus === AnswerStatus.correct) {
      return styleToUse.backgroundColorCorrect ?? defaultBg;
    }
    if (model?.isSelected) {
      return styleToUse.backgroundColorSelected ?? defaultBg;
    }
    return styleToUse.backgroundColor ?? defaultBg;
  }

  Logger.log(logSource, `(${model.word}) background = ${backgroundColor}`);
  const wordCardStyling = WordCardStyling(currentCardStyle, backgroundColor, borderColor);

  const content = (
    <GradientBorder
      model={{
        colors: borderColor,
        start:ThemeManager.theme.games.card.borderStart,
        end:ThemeManager.theme.games.card.borderEnd
      }}
      style={[
        wordCardStyling.host,
        model?.pressable && isPressed && animationStyles.pressed
      ]}
      innerStyle={wordCardStyling.innerContainer}>
      <View
        style={[
          wordCardStyling.imageContainer,
          !model?.imgVisible && wordCardStyling.invisibleImg
        ]}
      >
        <Image
          source={images[model?.image]}
          style={wordCardStyling.img}
          resizeMode={"center"}
        />
      </View>
      {model?.showText && <CardText style={wordCardStyling.text}>{model.word}</CardText>}
    </GradientBorder>
);

  return (
       <DraggablePressable  style={[style]} onPress={buttonPressed}>
         { content }
       </DraggablePressable>
  );
}

export default WordCardComponent;
