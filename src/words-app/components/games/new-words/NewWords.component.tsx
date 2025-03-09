/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { NewWordsModel } from "./NewWordsModel";
import { Logger } from "../../../../logger/Logger";
import WordCardComponent from "../word-card/WordCard.component";
import { NewWordsStyling } from "./NewWords.styling";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { Languages } from "../../../../app-data/language.ts";
import { GameModel } from "../models/GameModel.ts";

function NewWordsComponent({model, onCompleted}: GameModel<NewWordsModel>): React.JSX.Element {

  const logSource = "NewWordsComponent";

  const [buttonDisabled,setButtonDisabled] = useState(true);
  const [words,setWords] = useState<WordCardModel[]>([]);
  const [scaleAnimations, setScaleAnimations] = useState(() =>
    model.words.map(() => new Animated.Value(1))
  );
  let selectedLanguage = useRef<Languages>(Languages.EN);

  const appProducer = useRef<IAppProducer>(
    InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN)
  );

  useEffect(() => {
    selectedLanguage.current = appProducer.current?.getSelectedLanguage() || Languages.EN;
    setNextWordToSpeak(0);
  },[]);

  useEffect(() => {
    let newWords = model.words.map((word,i) => createWordModel(word, false));
    setWords(newWords);
  }, [buttonDisabled]);

  function setNextWordToSpeak(index: number) {
    Logger.log(logSource, "In setNextWordToSpeak: index = " + index);
    setTimeout(() => {
      let newWords = model.words.map((word,i) => createWordModel(word, index === i));
      setWords(newWords);
    }, 600);
  }

  function createWordModel(word: string, shouldSayTheWord:boolean){
    let dicWord = dictionary.getWord(selectedLanguage.current, word);
    return new WordCardModel( {
      id: word,
      ...dicWord || { word: word},
      shouldSayTheWord: shouldSayTheWord,
      pressable: !buttonDisabled,
      language: selectedLanguage.current
    })
  }

  function wordSpeakCompleted(index: number){
    Logger.log(logSource, "In wordSpeakCompleted for index " + index + ", buttonDisabled = " + buttonDisabled + ", words.length = " + model.words.length);
    if(buttonDisabled){
      if(index === model.words.length -1){
        setButtonDisabled(false);
      }
      else{
        setNextWordToSpeak(index + 1);
      }
    }

  }

  function wordSpeakStarted(index: number){
    animateWordScale(index);
  }

  function nextButtonPressed() {
    if(onCompleted){
      onCompleted();
    }
  }

  function animateWordScale(index: number) {
    Logger.log(logSource, "animateWordScale: index = " + index);
    Animated.sequence([
      Animated.timing(scaleAnimations[index], {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimations[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <View style={NewWordsStyling.host}>
      <View style={NewWordsStyling.cardContainer}>
        {
          words.map((wordModel, i) => (
            <Animated.View style={[NewWordsStyling.wordCard, { transform: [{ scale: scaleAnimations[i] }] }]} key={wordModel.word}>
                     <WordCardComponent
                       model={wordModel}
                       onSpeakStarted={() => wordSpeakStarted(i)}
                       onSpeakCompleted={() => wordSpeakCompleted(i)}></WordCardComponent>
            </Animated.View>
          ))
        }
      </View>
      <PrimaryButtonComponent wrapperStyle={NewWordsStyling.next} onPress={nextButtonPressed} disabled={buttonDisabled}>Next</PrimaryButtonComponent>
    </View>
  );
}

export default NewWordsComponent;
