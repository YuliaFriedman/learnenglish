/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SelectTranslationModel } from "./SelectTranslationModel";
import { Logger } from "../../../logger/Logger";
import { images } from "../../app-data/ImagesManager";
import { SelectTranslationStyling } from "./SelectTranslation.styling";
import NextButtonComponent from "../next-button/NextButton.component";
import { WordCardModel } from "../word-card/WordCardModel";
import { appProducer } from "../../app-data/store/AppProducer";
import { dictionary } from "../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";

function SelectTranslationComponent(args: {model: SelectTranslationModel}): React.JSX.Element {

  const logSource = "SelectTranslationComponent";

  const [translations,setTranslations] = useState<WordCardModel[]>([]);
  const [word, setWord] = useState("");
  const [selected, setSelected] = useState<number|undefined>(undefined);
  const [showIncorrect, setShowIncorrect] = useState(false);

  Logger.log(logSource, ">>>>>>>>> In SelectTranslationComponent");

  useEffect(() => {
    let selectedLanguage = null;
    let selectedTranslation = null;
    if(args.model.source){
      selectedLanguage = appProducer.getSelectedLanguage();
      selectedTranslation = appProducer.getSelectedTranslation();
    }
    else{
      selectedLanguage = appProducer.getSelectedTranslation();
      selectedTranslation = appProducer.getSelectedLanguage();
    }

    let newWords = args.model.translations.map((word,i) => {
      return {
        ...dictionary.getWord(selectedTranslation, word),
        shouldSayTheWord: false,
        pressable: true,
        language: selectedTranslation,
        onPressed: () => translationPressed(i)
      }
    });
    setTranslations(newWords);

    setWord(dictionary.getWord(selectedLanguage, args.model.word).word);
  }, []);

  function translationPressed(index: number){
    if(selected != index){
      setShowIncorrect(false);
    }
    setSelected(index);
  }

  function nextButtonPressed() {
    if(selected === args.model.answer){
      // play correct sound
      // go next
    }
    else{
      // play incorrect sound
      // mark as incorrect
      setShowIncorrect(true);
    }
  }

  return (
    <View>
      <View><Text>{word}</Text></View>
      <View style={SelectTranslationStyling.cardContainer}>
      {
        translations.map((translation, i) => {
          return <View
                    key={"translation_" + i}
                    style={[
                      SelectTranslationStyling.wordCard,
                      i === selected && SelectTranslationStyling.selectedWordCard,
                      showIncorrect && i === selected && selected != args.model.answer && SelectTranslationStyling.incorrectWordCard]}>
                    <WordCardComponent model={translation} ></WordCardComponent>
                 </View>
        })
      }
      </View>
      <View style={SelectTranslationStyling.next}>
        <NextButtonComponent onPress={nextButtonPressed} ></NextButtonComponent>
      </View>
    </View>
  );
}

export default SelectTranslationComponent;
