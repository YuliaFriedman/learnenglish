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
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { appProducer } from "../../../app-data/store/AppProducer";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
import { AudioManager } from "../../../../sound/AudioManager";
import { arrayUtil } from "../../../../utils/ArrayUtil";
import DraggableComponent from "../../../common-components/draggable/draggable.component";
import DroppableComponent, { DroppableComponentProps, DroppableComponentType } from "../../../common-components/droppable/droppable.component";
import SecondaryButtonComponent from "../../common/secondary-button/SecondaryButton.component.tsx";
import { AnswerStatus } from "../../../common-models/AnswerStatus";
import { AppSoundsPlayer } from "../../../../services/AppSoundsPlayer";

interface SolutionModel{
  sourceIndex: number;
  targetIndex: number;
  status: AnswerStatus;
}

function MatchTranslationComponent(args: {model: MatchTranslationModel}): React.JSX.Element {

  const logSource = "MatchTranslationComponent";

  const [words, setWords] = useState<WordCardModel[]>([]);
  const [translations, setTranslations] = useState<WordCardModel[]>([]);
  const [solutions, setSolutions] = useState<SolutionModel[]>([]);
  const [dropableProps, setDropableProps] = useState<{canDrop:boolean}[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const droppableComponents = useRef<DroppableComponentType[]|null[]>([]);

  useEffect(() => {
    initData();
  }, []);


  useEffect(() => {
    updateDataBySolution();
    setCanContinue(solutions.length == args.model.words.length);
  },[solutions]);

  function updateDataBySolution(){
    if(words && words.length > 0){
      let newWords = [...words];
      let newDropable = [...dropableProps];
      Logger.log(logSource, `Solutions changed: solutions = ${JSON.stringify(solutions)}`);
      newWords.forEach((word, index) => {
        let solutionOfWord = solutions.find(sol => sol.targetIndex === index);
        if(solutionOfWord){
          word.image = translations[solutionOfWord.sourceIndex].image;
          newDropable[index].canDrop = false;
        }
        else{
          word.image = 'questionMark';
          word.answerStatus = AnswerStatus.notChecked;
          newDropable[index].canDrop = true;
        }
      });
      setWords(newWords);
      setDropableProps(newDropable);
    }
  }

  function initData(){
    const selectedLanguage = appProducer.getSelectedLanguage();
    const selectedTranslation = appProducer.getSelectedTranslation();
    const wordsList:WordCardModel[] = [];
    const translationsList:WordCardModel[] = [];

    // init words
    args?.model?.words.forEach((word) => {
      const dictionaryWord = dictionary.getWord(selectedLanguage, word);
      wordsList.push(new WordCardModel({
        id: word,
        ...dictionaryWord,
        language: selectedLanguage,
        image: "questionMark",
        pressable: true
      }));
      arrayUtil.shuffleArray(wordsList);
      setWords(wordsList);

      // init translations
      const dictionaryTranslationWord = dictionary.getWord(selectedTranslation, word);
      translationsList.push(new WordCardModel({
        id: word,
        ...dictionaryTranslationWord,
        language: selectedTranslation,
        showText: false,
      }));
      arrayUtil.shuffleArray(translationsList);
      setTranslations(translationsList);

      // set dropable props
      setDropableProps(currentList => {
        currentList.push({ canDrop: true });
        return currentList;
      });
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
    if(checkSolutions()){
      AppSoundsPlayer.playCorrectSound();
      appProducer.setNextStep();
    }
    else{
      setCanContinue(false);
      AppSoundsPlayer.playWrongAnswer();
    }
  }

  function checkSolutions(){
    let allAnswersCorrect = true;
    solutions.forEach(solution => {
      const sourceWordIndex = args.model.words.indexOf(words[solution.sourceIndex].id);
      const targetWordIndex = args.model.words.indexOf(words[solution.targetIndex].id);
      allAnswersCorrect = allAnswersCorrect && sourceWordIndex === targetWordIndex;
      setWords(currentWords => {
        const result = [...currentWords];
        result[solution.sourceIndex] = {
          ...result[solution.sourceIndex],
          answerStatus: sourceWordIndex === targetWordIndex ? AnswerStatus.correct : AnswerStatus.wrong
        }
        return result;
      })

    });
    return allAnswersCorrect;
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
          newSolution = newSolution.splice(currentValInWord, 1);
        }
        newSolution.push({
          sourceIndex: translationIndex,
          targetIndex: wordIndex,
          status: AnswerStatus.notChecked
        })
        return newSolution;
    });
  }

  return (
    <View style={MatchTranslationStyling.host}>
      <View style={MatchTranslationStyling.cardRow}>
        {
          words.map((word, i) => {
            return <View style={[MatchTranslationStyling.wordCard]} key={"words_" + i}>
              <DroppableComponent  {...dropableProps[i]} ref={(ref) => droppableComponents.current[i] = ref}
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
        <SecondaryButtonComponent onPress={resetMatch} disabled={solutions.length == 0}>Reset</SecondaryButtonComponent>
        <PrimaryButtonComponent onPress={nextButtonPressed} disabled={!canContinue}>Next</PrimaryButtonComponent>
      </View>
    </View>
  );
}

export default MatchTranslationComponent;
