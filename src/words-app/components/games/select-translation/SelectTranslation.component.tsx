/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { SelectTranslationModel } from "./SelectTranslationModel";
import { Logger } from "../../../../logger/Logger";
import { SelectTranslationStyling } from "./SelectTranslation.styling";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
import WordTextCardComponent from "../word-text-card/WordTextCard.component";
import { WordTextCardModel } from "../word-text-card/WordTextCardModel";
import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import { AppSoundsPlayer } from "../../../../services/AppSoundsPlayer.ts";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { Languages } from "../../../../app-data/language.ts";

function SelectTranslationComponent(args: {model: SelectTranslationModel}): React.JSX.Element {

  const logSource = "SelectTranslationComponent";

  const [translations,setTranslations] = useState<WordCardModel[]>([]);
  const [word, setWord] = useState<WordTextCardModel|undefined>(undefined);
  const appProducer = useRef<IAppProducer | null>(null);
  Logger.log(logSource, ">>>>>>>>> In MatchTranslationComponent");

  useEffect(() => {
    initInjections();
    initData();
  }, []);

  function initInjections(){
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }
  }

  function initData(){
    let selectedLanguage: string = "";
    let selectedTranslation: string = "";
    if(args.model.source){
      selectedLanguage = appProducer.current?.getSelectedLanguage() || Languages.EN;
      selectedTranslation = appProducer.current?.getSelectedTranslation() || Languages.EN;
    }
    else{
      selectedLanguage = appProducer.current?.getSelectedTranslation() || Languages.EN;
      selectedTranslation = appProducer.current?.getSelectedLanguage() || Languages.EN;
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
      appProducer.current?.setNextStep();
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
