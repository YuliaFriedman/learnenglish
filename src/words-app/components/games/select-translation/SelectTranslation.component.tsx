/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SelectTranslationModel } from "./SelectTranslationModel";
import { Logger } from "../../../../logger/Logger";
import { images } from "../../../app-data/ImagesManager";
import { SelectTranslationStyling } from "./SelectTranslation.styling";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { appProducer } from "../../../app-data/store/AppProducer";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
import WordTextCardComponent from "../word-text-card/WordTextCard.component";
import { WordTextCardModel } from "../word-text-card/WordTextCardModel";
import { AnswerStatus } from "../../../common-models/AnswerStatus";
import { AppSoundsPlayer } from "../../../../services/AppSoundsPlayer.ts";

function SelectTranslationComponent(args: {model: SelectTranslationModel}): React.JSX.Element {

  const logSource = "SelectTranslationComponent";

  const [translations,setTranslations] = useState<WordCardModel[]>([]);
  const [word, setWord] = useState<WordTextCardModel|undefined>(undefined);

  Logger.log(logSource, ">>>>>>>>> In MatchTranslationComponent");

  useEffect(() => {
    initData();
  }, []);

  function initData(){
    let selectedLanguage = null;
    let selectedTranslation: string = "";
    if(args.model.source){
      selectedLanguage = appProducer.getSelectedLanguage();
      selectedTranslation = appProducer.getSelectedTranslation();
    }
    else{
      selectedLanguage = appProducer.getSelectedTranslation();
      selectedTranslation = appProducer.getSelectedLanguage();
    }

    let newWords = args.model.translations.map((word,i) => {
      return new WordCardModel({
        id: word,
        ...dictionary.getWord(selectedTranslation, word),
        shouldSayTheWord: false,
        pressable: true,
        language: selectedTranslation,
      });
    });
    setTranslations(newWords);

    setWord(new WordTextCardModel({
      id: args.model.word,
      ...dictionary.getWord(selectedLanguage, args.model.word),
      pressable: true,
      shouldSayTheWord: false,
      language: selectedLanguage,
    }));
  }

  function translationPressed(index: number){
    setTranslations(currentTranslations => {
      return currentTranslations.map((tran, i) => {
        return {
          ...tran,
          answerStatus: AnswerStatus.notChecked,
          isSelected: i === index
        }
      })
    });
  }

  function nextButtonPressed() {
    if(isCorrectAnswer()){
      AppSoundsPlayer.playCorrectSound();
      appProducer.setNextStep();
    }
    else{
      AppSoundsPlayer.playWrongAnswer();
      setTranslations(currentTranslations => {
        return currentTranslations.map((tran, i) => {
          return {
            ...tran,
            answerStatus: tran.isSelected ? AnswerStatus.wrong : AnswerStatus.notChecked
          }
        })
      });
    }
  }

function isCorrectAnswer(){
  const selectedIndex = translations.findIndex(item => item.isSelected);
  return selectedIndex === args.model.answer;
}

  return (
    <View style={SelectTranslationStyling.host}>
      <View>
        {word ? <WordTextCardComponent model={word}></WordTextCardComponent> : <></>}
      </View>
      <View style={SelectTranslationStyling.cardContainer}>
      {
        translations.map((translation, i) => {
          return (
            <View key={"translation_" + i} style={[SelectTranslationStyling.wordCard]}>
                <WordCardComponent onPressed={() => translationPressed(i)} model={translation} ></WordCardComponent>
            </View>
          )
        })
      }
      </View>
      <View style={SelectTranslationStyling.next}>
        <PrimaryButtonComponent onPress={nextButtonPressed}>Next</PrimaryButtonComponent>
      </View>
    </View>
  );
}

export default SelectTranslationComponent;
