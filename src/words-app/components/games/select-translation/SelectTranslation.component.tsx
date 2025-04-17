/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { SelectTranslationModel } from "./SelectTranslationModel";
import { SelectTranslationStyling } from "./SelectTranslation.styling";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
import WordTextCardComponent from "../word-text-card/WordTextCard.component";
import { WordTextCardModel } from "../word-text-card/WordTextCardModel";
import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import { AppSoundsPlayer } from "../../../../services/AppSoundsPlayer.ts";
import { Languages } from "../../../../app-data/language.ts";
import { SpacingRow } from "../../../../core/components/spacing-row/SpacingRow.tsx";
import { GameComponentProps } from "../models/GameModel.ts";
import { IShakeView, ShakeView } from "../../../../core/components/animations/shake/ShakeView.component.tsx";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";

function SelectTranslationComponent({model, onCompleted}: GameComponentProps<SelectTranslationModel>): React.JSX.Element {

  const logSource = "SelectTranslationComponent";
  //const { model, onCompleted } = route.params;
  const incorrectCardRefs = useRef<Array<IShakeView>>([]);
  const [translations,setTranslations] = useState<WordCardModel[]>([]);
  const [word, setWord] = useState<WordTextCardModel|undefined>(undefined);
  const { appProducer } = useServices();

  useEffect(() => {
    initData();
  }, []);


  function initData(){
    let selectedLanguage: Languages = Languages.EN;
    let selectedTranslation: Languages = Languages.EN;
    if(model.source){
      selectedLanguage = appProducer.getSelectedLanguage() || Languages.EN;
      selectedTranslation = appProducer.getSelectedTranslation() || Languages.EN;
    }
    else{
      selectedLanguage = appProducer.getSelectedTranslation() || Languages.EN;
      selectedTranslation = appProducer.getSelectedLanguage() || Languages.EN;
    }

    let newWords = model.translations.map((word,i) => {
      return new WordCardModel({
        id: word,
        ...dictionary.getWord(selectedTranslation, word),
        shouldSayTheWord: false,
        pressable: true,
        language: selectedTranslation,
        selectable: true
      });
    });
    setTranslations(newWords);

    setWord(new WordTextCardModel({
      id: model.word,
      ...dictionary.getWord(selectedLanguage, model.word),
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
          isSelected: i === index,
          selectable: true,
        }
      })
    });
  }

  function nextButtonPressed() {
    if(isCorrectAnswer()){
      AppSoundsPlayer.playCorrectSound();
      setTranslations(currentTranslations => {
        return currentTranslations.map((tran, i) => {
          return {
            ...tran,
            answerStatus: tran.isSelected ? AnswerStatus.correct : AnswerStatus.notChecked
          }
        })
      });
      if(onCompleted){
        setTimeout(() => {
          onCompleted();
        }, 500);
      }
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
      const selectedIndex = translations.findIndex(item => item.isSelected);
      incorrectCardRefs.current[selectedIndex]?.shake();
    }
  }

function isCorrectAnswer(){
  const selectedIndex = translations.findIndex(item => item.isSelected);
  return selectedIndex === model.answer;
}

  return (
    <View style={SelectTranslationStyling.host}>
      <View style={SelectTranslationStyling.header}>
          {word ? <WordTextCardComponent style={SelectTranslationStyling.questionCard} model={word}></WordTextCardComponent> : <></>}
      </View>
      <SpacingRow flex={1}></SpacingRow>
      <View style={SelectTranslationStyling.cardContainer}>
      {
        translations.map((translation, i) => {
          return (
            <View key={"translation_" + i} style={[SelectTranslationStyling.wordCard]}>
              <ShakeView
                // @ts-ignore
                ref={ref => incorrectCardRefs.current[i] = ref}
              >
                <WordCardComponent onPressed={() => translationPressed(i)} model={translation} ></WordCardComponent>
              </ShakeView>
            </View>
          )
        })
      }
      </View>
      <PrimaryButtonComponent wrapperStyle={SelectTranslationStyling.next} onPress={nextButtonPressed}>Next</PrimaryButtonComponent>
    </View>
  );
}

export default SelectTranslationComponent;
