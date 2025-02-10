/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { MatchTranslationModel } from "./MatchTranslationModel";
import { Logger } from "../../../../logger/Logger";
import { MatchTranslationStyling } from "./MatchTranslation.styling";
import NextButtonComponent from "../../common/next-button/NextButton.component";
import { WordCardModel } from "../word-card/WordCardModel";
import { appProducer } from "../../../app-data/store/AppProducer";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
import { AudioManager } from "../../../../sound/AudioManager";
import { arrayUtil } from "../../../../utils/ArrayUtil";
import DraggableComponent from "../../../common-components/draggable/draggable.component";
import DroppableComponent, { DroppableComponentType } from "../../../common-components/droppable/droppable.component";
import CancelButtonComponent from "../../common/cancel-button/CancelButton.component";

interface SolutionModel{
  sourceIndex: number;
  targetIndex: number;
}

function MatchTranslationComponent(args: {model: MatchTranslationModel}): React.JSX.Element {

  const logSource = "MatchTranslationComponent";

  const [words, setWords] = useState<WordCardModel[]>([]);
  const [translations, setTranslations] = useState<WordCardModel[]>([]);
  const [solutions, setSolutions] = useState<SolutionModel[]>([]);

  const [canContinue, setCanContinue] = useState(false);
  const droppableComponents = useRef<DroppableComponentType[]|null[]>([]);

  useEffect(() => {
    initData();
  }, []);


  useEffect(() => {
    if(words && words.length > 0){
      let newWords = [...words];
      
      Logger.log(logSource, `Solutions changed: solutions = ${JSON.stringify(solutions)}`);
      newWords.forEach((word, index) => {
        let solutionOfWord = solutions.find(sol => sol.targetIndex === index);
        if(solutionOfWord){
          word.image = translations[solutionOfWord.sourceIndex].image;
        }
        else{
          word.image = 'questionMark';
        }
      })
      setWords(newWords);
    }
  },[solutions]);

  function initData(){
    const selectedLanguage = appProducer.getSelectedLanguage();
    const selectedTranslation = appProducer.getSelectedTranslation();
    const wordsList:WordCardModel[] = [];
    const translationsList:WordCardModel[] = [];

    args?.model?.words.forEach((word) => {
      const dictionaryWord = dictionary.getWord(selectedLanguage, word);
      wordsList.push(new WordCardModel({
        ...dictionaryWord,
        language: selectedLanguage,
        image: "questionMark",
        pressable: true
      }));
      arrayUtil.shuffleArray(wordsList);
      setWords(wordsList);

      const dictionaryTranslationWord = dictionary.getWord(selectedTranslation, word);
      translationsList.push(new WordCardModel({
        ...dictionaryTranslationWord,
        language: selectedTranslation,
        showText: false,
        pressable: true
      }));
      arrayUtil.shuffleArray(translationsList);
      setTranslations(translationsList);
    });
    playInstructions();
  }

  function playInstructions(){
    /*AudioManager.playSound({
      text: "Find the correct matches",
      language: appProducer.getSelectedLanguage(),
      soundKey: ""
    });*/
  }

  function nextButtonPressed() {
    appProducer.setNextStep();
  }

  function resetMatch(){
    setSolutions([]);
  }

  function onDropToLayout(translationIndex:number, wordIndex: number){
    Logger.log(logSource, `in onDrop: target index = ${wordIndex}`);
    setSolutions((currentSolution) => {
        let newSolution = [...currentSolution];
        let currentValInWord = currentSolution.findIndex(item => item.sourceIndex === translationIndex);
        if(currentValInWord >= 0){
          newSolution[currentValInWord].targetIndex = wordIndex
        }
        else{
          newSolution.push({
            sourceIndex: translationIndex,
            targetIndex: wordIndex
          })
        }
        return newSolution;
    });
  }

  return (
    <View style={MatchTranslationStyling.host}>
      <View style={MatchTranslationStyling.cardRow}>
        {
          words.map((word, i) => {
            return <View style={[MatchTranslationStyling.wordCard]} key={"words_" + i}>
              <DroppableComponent  ref={(ref) => droppableComponents.current[i] = ref} 
              highlightSettings={[{cssProperty: "backgroundColor", defaultValue: MatchTranslationStyling.wordCard.backgroundColor, value: MatchTranslationStyling.dropHighlight.backgroundColor}]}>
                <View style={{height: "100%"}}>
                  <WordCardComponent model={word} ></WordCardComponent>
                </View>
              </DroppableComponent>
            </View>
          })
        }
      </View>

      <View style={MatchTranslationStyling.translationsRow}>
        {translations.map((word, i) => {
          if(solutions.find(item => item.sourceIndex === i)){
            return <View key={"translation_" + i} style={[MatchTranslationStyling.singleMatchItem,]}>
            </View>
          }
          else{
            return <View key={"translation_" + i} style={[MatchTranslationStyling.singleMatchItem]}
                          >
              <DraggableComponent 
                droppableComponents={droppableComponents.current}
                onDrop={(targetIndex) => onDropToLayout(i, targetIndex)}>
                <WordCardComponent model={word} />
              </DraggableComponent>
              </View>
          }
        })}
      </View>

      <View style={MatchTranslationStyling.nextContainer}>
        <CancelButtonComponent onPress={resetMatch} disabled={solutions.length == 0}>Reset</CancelButtonComponent>
        <NextButtonComponent onPress={nextButtonPressed} disabled={!canContinue}>Next</NextButtonComponent>
      </View>
    </View>
  );
}

export default MatchTranslationComponent;
