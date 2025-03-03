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
import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import { DraggablePressable } from "../../../../core/components/draggable/draggablePressable.tsx";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { IAudioManager } from "../../../../sound/IAudioManager.ts";
import { TileOutfitComponent } from "../../common/tile-outfit/TileOutfit.component.tsx";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import LinearGradient from "react-native-linear-gradient";
import { GradientBorder } from "../../../../core/components/gradient-border/GradienBorder.tsx";

export interface WordCardComponentProps {
  model: WordCardModel;
  onSpeakStarted?: () => void,
  onSpeakCompleted?: () => void,
  onPressed?: () => void
}

function WordCardComponent({ model, onSpeakStarted, onSpeakCompleted, onPressed }:WordCardComponentProps): React.JSX.Element {

  const logSource = "WordCardComponent";
  const audioManager = useRef<IAudioManager>(
    InjectionManager.useInjection<IAudioManager>(DepInjectionsTokens.AUDIO_MANAGER_TOKEN)
  );
  const [borderColor, setBorderColor] = useState(ThemeManager.theme.games.card.borderColors);
  const [backgroundColor, setBackgroundColor] = useState(ThemeManager.theme.games.card.borderColors);

  useEffect(() => {
    if(model?.shouldSayTheWord){
      playSound();
    }
  }, [model?.shouldSayTheWord]);

  useEffect(() => {
    Logger.log(logSource, "status has changed " + model?.word + " status = " + model?.answerStatus);
    setBorderColor(getCardBorder());
    setBackgroundColor(getCardBackground());
  }, [model?.answerStatus, model?.isSelected])

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

  function getCardBorder(){
    if(model?.answerStatus === AnswerStatus.wrong){
      return ThemeManager.theme.games.selectableCard.borderColorWrong;
    }
    if(model?.answerStatus === AnswerStatus.correct){
      return ThemeManager.theme.games.selectableCard.borderColorCorrect;
    }
    if(model?.isSelected){
      return ThemeManager.theme.games.selectableCard.borderColorSelected;
    }
    return model.selectable ? ThemeManager.theme.games.selectableCard.borderColors : ThemeManager.theme.games.card.borderColors;
  }

  function getCardBackground() {
    if(model?.answerStatus === AnswerStatus.wrong){
      return ThemeManager.theme.games.selectableCard.backgroundColorWrong;
    }
    if(model?.answerStatus === AnswerStatus.correct){
      return ThemeManager.theme.games.selectableCard.backgroundColorCorrect;
    }
    if(model?.isSelected){
      return ThemeManager.theme.games.selectableCard.backgroundColorSelected;
    }
    return model.selectable ?  ThemeManager.theme.games.selectableCard.backgroundColor : ThemeManager.theme.games.card.backgroundColor;
  }

  const wordCardStyling = WordCardStyling(ThemeManager.theme.games.card, backgroundColor);

  return (


       <DraggablePressable onPress={buttonPressed}>
         <GradientBorder
           model={{
             colors: borderColor,
             start:ThemeManager.theme.games.card.borderStart,
             end:ThemeManager.theme.games.card.borderEnd
            }}
            style={wordCardStyling.host}
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
            {model?.showText && <Text style={wordCardStyling.text}>{model.word}</Text>}
         </GradientBorder>
      </DraggablePressable>

  );
}

export default WordCardComponent;
