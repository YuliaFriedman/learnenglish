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

  const [buttonDisabled,setButtonDisabled] = useState(true);
  const [translations,setTranslations] = useState<WordCardModel[]>([]);
  const [word, setWord] = useState("");


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
        language: selectedTranslation
      }
    });
    setTranslations(newWords);

    setWord(dictionary.getWord(selectedLanguage, args.model.word).word);
  }, []);

  function nextButtonPressed() {

  }

  return (
    <View>
      <View><Text>{word}</Text></View>
      <View style={SelectTranslationStyling.cardContainer}>
      {
        translations.map((translation, i) => {
          return <View key={"translation_" + i} style={SelectTranslationStyling.wordCard}><WordCardComponent model={translation} ></WordCardComponent></View>
        })
      }
      </View>
      <View style={SelectTranslationStyling.next}>
        <NextButtonComponent onPress={nextButtonPressed} disabled={buttonDisabled}></NextButtonComponent>
      </View>
    </View>
  );
}

export default SelectTranslationComponent;
