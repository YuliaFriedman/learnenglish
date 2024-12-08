/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { MatchTranslationModel } from "./MatchTranslationModel";
import { Logger } from "../../../logger/Logger";
import { MatchTranslationStyling } from "./MatchTranslation.styling";
import NextButtonComponent from "../next-button/NextButton.component";
import { WordCardModel } from "../word-card/WordCardModel";
import { appProducer } from "../../app-data/store/AppProducer";
import { dictionary } from "../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
import { AudioManager } from "../../../sound/AudioManager";
import { arrayUtil } from "../../../utils/ArrayUtil";
import DraggableComponent from "../../common-components/draggable/draggable.component";

function MatchTranslationComponent1(args: {model: MatchTranslationModel}): React.JSX.Element {

  const logSource = "MatchTranslationComponent111";

  const [words, setWords] = useState<WordCardModel[]>([]);
  const [translations, setTranslations] = useState<WordCardModel[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const dropRefs = useRef([]);

  useEffect(() => {
    initData();
  }, []);

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

  return (
    <View style={MatchTranslationStyling.host}>
      <View style={MatchTranslationStyling.cardRow}>
        {
          words.map((word, i) => {
            return <View
              key={"words_" + i}
              style={[MatchTranslationStyling.wordCard]}
              ref={(ref) => (dropRefs.current[i] = ref)}>
              <WordCardComponent model={word}></WordCardComponent>
            </View>
          })
        }
      </View>

      <View style={MatchTranslationStyling.translationsRow}>
        {translations.map((word, i) => {
          return <View key={"translation_" + i}
                           style={[MatchTranslationStyling.singleMatchItem]}
                           >
            <DraggableComponent centralRefs={dropRefs}><WordCardComponent model={word} /></DraggableComponent>
            </View>



        })}
      </View>

      <View style={MatchTranslationStyling.nextContainer}><NextButtonComponent onPress={nextButtonPressed} disabled={!canContinue}></NextButtonComponent></View>
    </View>
  );
}

export default MatchTranslationComponent1;
