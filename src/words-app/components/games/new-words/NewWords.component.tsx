/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Animated, Text, View } from "react-native";
import { NewWordsModel } from "./NewWordsModel";
import { Logger } from "../../../../logger/Logger";
import WordCardComponent from "../word-card/WordCard.component";
import { NewWordsStyling } from "./NewWords.styling";
import NextButtonComponent from "../../common/next-button/NextButton.component";
import { WordCardModel } from "../word-card/WordCardModel";
import { appProducer } from "../../../app-data/store/AppProducer";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";

function NewWordsComponent(args: {model: NewWordsModel}): React.JSX.Element {

  const logSource = "NewWordsComponent";

  const [buttonDisabled,setButtonDisabled] = useState(true);
  const [words,setWords] = useState<WordCardModel[]>([]);
  const [scaleAnimations, setScaleAnimations] = useState(() =>
    args.model.words.map(() => new Animated.Value(1))
  );

  useEffect(() => {
    setNextWordToSpeak(0);
  },[]);

  useEffect(() => {
    const selectedLanguage = appProducer.getSelectedLanguage();
    let newWords = args.model.words.map((word,i) => {
      return {
        ...dictionary.getWord(selectedLanguage, word),
        word: word,
        image: "",
        sound: "",
        shouldSayTheWord: false,
        onSpeakStarted: () => wordSpeakStarted(i),
        onSpeakCompleted: () => wordSpeakCompleted(i),
        pressable: !buttonDisabled,
        language: selectedLanguage
      }
    });
    setWords(newWords);
  }, [buttonDisabled]);

  function setNextWordToSpeak(index: number) {
    Logger.log(logSource, "In setNextWordToSpeak: index = " + index);
    setTimeout(() => {
      const selectedLanguage = appProducer.getSelectedLanguage();
      let newWords = args.model.words.map((word,i) => {
        return {
          ...dictionary.getWord(selectedLanguage, word),
          shouldSayTheWord: index === i,
          onSpeakStarted: () => wordSpeakStarted(i),
          onSpeakCompleted: () => wordSpeakCompleted(i),
          pressable: !buttonDisabled,
          language: selectedLanguage
        }
      });
      setWords(newWords);
    }, 600);
  }

  function wordSpeakCompleted(index: number){
    Logger.log(logSource, "In wordSpeakCompleted for index " + index + ", buttonDisabled = " + buttonDisabled + ", words.length = " + args.model.words.length);
    if(buttonDisabled){
      if(index === args.model.words.length -1){
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
    appProducer.setNextStep();
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
    <View>
      <View style={NewWordsStyling.cardContainer}>
        {
          words.map((wordModel, i) => (
            <Animated.View style={[NewWordsStyling.wordCard, { transform: [{ scale: scaleAnimations[i] }] }]} key={wordModel.word}>
                     <WordCardComponent model={wordModel} ></WordCardComponent>
            </Animated.View>
          ))
        }
      </View>
      <View style={NewWordsStyling.next}>
        <NextButtonComponent onPress={nextButtonPressed} disabled={buttonDisabled}></NextButtonComponent>
      </View>
    </View>
  );
}

export default NewWordsComponent;
