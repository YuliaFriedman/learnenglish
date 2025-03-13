/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { MatchTranslationModel } from "./MatchTranslationModel";
import { Logger } from "../../../../logger/Logger";
import { MatchTranslationStyling } from "./MatchTranslation.styling";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent, { CardStyle } from "../word-card/WordCard.component";
import { arrayUtil } from "../../../../utils/ArrayUtil";
import DraggableComponent from "../../../../core/components/draggable/draggable.component";
import DroppableComponent, { DroppableComponentType } from "../../../../core/components/droppable/droppable.component";
import SecondaryButtonComponent from "../../common/secondary-button/SecondaryButton.component.tsx";
import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import { AppSoundsPlayer } from "../../../../services/AppSoundsPlayer";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { Languages } from "../../../../app-data/language.ts";
import { GameModel } from "../models/GameModel.ts";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { IShakeView, ShakeView } from "../../../../core/components/animations/shake/ShakeView.component.tsx";

interface SolutionModel{
  sourceIndex: number;
  targetIndex: number;
  status: AnswerStatus;
}

function MatchTranslationComponent({model, onCompleted}: GameModel<MatchTranslationModel>): React.JSX.Element {

  const logSource = "MatchTranslationComponent";

  const [words, setWords] = useState<WordCardModel[]>([]);
  const [translations, setTranslations] = useState<WordCardModel[]>([]);
  const [solutions, setSolutions] = useState<SolutionModel[]>([]);
  const [dropableProps, setDropableProps] = useState<{canDrop:boolean}[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const droppableComponents = useRef<DroppableComponentType[]|null[]>([]);
  const [cardsStyle,setCardsStyle] = useState<Partial<CardStyle>[]>([]);
  const incorrectCardRefs = useRef<Array<IShakeView>>([]);
  const appProducer = useRef<IAppProducer>(InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN));
  Logger.log(logSource, `${JSON.stringify(ThemeManager.theme.games.matchTranslation.card)}`)


  useEffect(() => {
    initData();
  }, []);


  useEffect(() => {
    updateDataBySolution();
    setCanContinue(solutions.length == model.words.length);
    updateCardsStyleBySolutions();
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
    const selectedLanguage = appProducer.current?.getSelectedLanguage() || Languages.EN;
    const selectedTranslation = appProducer.current?.getSelectedTranslation() || Languages.EN;
    const wordsList:WordCardModel[] = [];
    const translationsList:WordCardModel[] = [];

    // init words
    model?.words.forEach((word) => {
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

      // set cards style
      setCardsStyle(currentList => {
        currentList.push(getDefaultCardStyle());
        return currentList;
      })
    });
    playInstructions();
  }

  function getDefaultCardStyle(){
    return {...ThemeManager.theme.games.matchTranslation.card};
  }

  function playInstructions(){
    /*AudioManager.playSound({
      text: "Find the correct matches",
      language: appProducer.getSelectedLanguage(),
      soundKey: ""
    });*/
  }

  function nextButtonPressed() {
    const wrongAnswers = checkSolutions();
    Logger.log(logSource, `wrong answers = ${JSON.stringify(wrongAnswers)}`);
    if(wrongAnswers.length == 0){
      AppSoundsPlayer.playCorrectSound();
      if(onCompleted){
        onCompleted();
      }
    }
    else{
      setCanContinue(false);
      AppSoundsPlayer.playWrongAnswer();
      words.forEach((word, index) => {
        if (wrongAnswers.indexOf(index) >= 0) {
          Logger.log(logSource, `shaking ${word}`);
          incorrectCardRefs.current[index]?.shake();
        }
      });

      setTimeout(() => {
        setSolutions(currentSolutions =>
          currentSolutions.filter(solution =>
            wrongAnswers.indexOf(solution.targetIndex) === -1
          )
        );
      }, 800);
    }
  }

  function checkSolutions():number[]{
    const wrongAnswers:number[] = [];
    solutions.forEach(solution => {
      const sourceWordIndex = model.words.indexOf(words[solution.sourceIndex].id);
      const targetWordIndex = model.words.indexOf(words[solution.targetIndex].id);
      if(sourceWordIndex !== targetWordIndex){
        wrongAnswers.push(solution.sourceIndex);
      }
    });
    setWords(currentWords => {
      const result = [...currentWords];
      result.forEach((word, index) => {
        word.answerStatus = wrongAnswers.indexOf(index) >= 0 ? AnswerStatus.wrong : AnswerStatus.correct;
      });
      return result;
    })
    return wrongAnswers;
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

  function updateCardsStyleBySolutions(){
    setCardsStyle(currentList => {
      const newCardStyleList = currentList.map(item => getDefaultCardStyle());
      solutions.forEach(solution => {
        newCardStyleList[solution.targetIndex] = ThemeManager.theme.games.matchTranslation.cardWithAnswer;
      });
      console.log("newCardStyleList: " + JSON.stringify(newCardStyleList));
      return newCardStyleList;
    });
  }

  return (
    <View style={MatchTranslationStyling.host}>
      <View style={MatchTranslationStyling.cardRow}>
        {
          words.map((word, i) => {
            return <ShakeView
              // @ts-ignore
              ref={ref => incorrectCardRefs.current[i] = ref}
              key={"words_" + i}
              style={MatchTranslationStyling.wordCard}
            >
              <DroppableComponent  {...dropableProps[i]}
                                   ref={(ref) => droppableComponents.current[i] = ref}
                                   style={[MatchTranslationStyling.droppableStyle]}
                                  highlightSettings={[
                                    {cssProperty: "backgroundColor", defaultValue: ThemeManager.theme.games.matchTranslation.highlight.backgroundColor, value: ThemeManager.theme.games.matchTranslation.highlightOnDrag.backgroundColor },
                                    {
                                      cssProperty: "borderColor",
                                      defaultValue: ThemeManager.theme.games.matchTranslation.highlight.borderColor,
                                      value: ThemeManager.theme.games.matchTranslation.highlightOnDrag.borderColor
                                    },
                                  ]}
              >
                <WordCardComponent cardStyle={cardsStyle.length >= i ? cardsStyle[i] : undefined} model={word} ></WordCardComponent>
              </DroppableComponent>
            </ShakeView>
          })
        }
      </View>

      <View style={MatchTranslationStyling.translationsRow}>
        {translations.map((word, i) => {
          if(solutions.find(item => item.sourceIndex === i)){
            return <View key={"translation_" + i} style={[MatchTranslationStyling.singleMatchItem]}></View>
          }
          else{
            return <View key={"translation_" + i} style={[MatchTranslationStyling.singleMatchItem]}>
                <DraggableComponent
                  // @ts-ignore
                  droppableComponents={droppableComponents.current}
                  onDrop={(targetIndex) => onDropToLayout(i, targetIndex)}>
                  <WordCardComponent cardStyle={ThemeManager.theme.games.matchTranslation.answer} model={word} />
                </DraggableComponent>
              </View>
          }
        })}
      </View>

      <View style={MatchTranslationStyling.nextContainer}>
        <SecondaryButtonComponent wrapperStyle={MatchTranslationStyling.footerButtonStyle} onPress={resetMatch} disabled={solutions.length == 0}>Reset</SecondaryButtonComponent>
        <PrimaryButtonComponent wrapperStyle={MatchTranslationStyling.footerButtonStyle} onPress={nextButtonPressed} disabled={!canContinue}>Next</PrimaryButtonComponent>
      </View>
    </View>
  );
}

export default MatchTranslationComponent;
