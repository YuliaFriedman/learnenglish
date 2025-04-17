/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, View } from "react-native";
import { SayWordModel } from "./SayWordModel";
import { Logger } from "../../../../logger/Logger";
import { SayWordStyling } from "./SayWord.styling";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { WordCardModel } from "../word-card/WordCardModel";
import { dictionary } from "../../../app-data/levels/dictionary/Dictionary";
import WordCardComponent from "../word-card/WordCard.component";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { SpeechResults } from "../../../../sound/SpeechToTextManager";
import { Languages } from "../../../../app-data/language.ts";
import { SpeechButton } from "../../common/speech-button/SpeechButton.tsx";
import { SpeechConfirmedButton } from "../../common/speech-button/SpeechConfirmedButton.tsx";
import { GameComponentProps } from "../models/GameModel.ts";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";

function SayWordComponent({model,onCompleted}: GameComponentProps<SayWordModel>): React.JSX.Element {

  const logSource = "SayWordComponent";
  //const { model, onCompleted } = route.params;
  const [word, setWord] = useState<WordCardModel|undefined>(undefined);
  const [canContinue, setCanContinue] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxNumOfAttempts = useRef(2);

  const { appProducer, audioManager} = useServices();

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if(attempts > maxNumOfAttempts.current){
      setCanContinue(true);
    }
  }, [attempts])

  function initData(){
    const selectedLanguage = appProducer.getSelectedLanguage() || Languages.EN;
    const wordFromDictionary = dictionary.getWord(selectedLanguage, model.word);
    setWord(new WordCardModel({
      id: model.word,
      ...wordFromDictionary,
      pressable: true,
      shouldSayTheWord: false,
      language: selectedLanguage
    }));

    if(wordFromDictionary){
      audioManager.playSound({
        text: "Press the microphone button and say the word",
        language: appProducer.getSelectedLanguage() || Languages.EN,
        soundKey: ""
      }).then(() => {
        setTimeout(() => {
          audioManager.playSound({
            text: wordFromDictionary.word,
            language: appProducer.getSelectedLanguage() || Languages.EN,
            soundKey: ""
          });
        }, 400);
      });
    }
  }

  function speechResultsHandler(results:SpeechResults){
    Logger.log(logSource, `Speech completed: word = ${JSON.stringify(word)}`);
    let hasWordInResults = !word?.word || resultsContainWord(word.word, results);
    // && results?.values && results?.values.some(val =>
    //   val && val.toLowerCase().includes(word.word.toLowerCase())
    // );
    Logger.log(logSource, "has word in results: " + hasWordInResults + ", word = " + word?.word, false, results);
    if(hasWordInResults){
      setCanContinue(true);
    }
    else{
      setCanContinue(false);
      setAttempts(attempts => attempts + 1);
    }
  }

  function resultsContainWord(word:string, results: SpeechResults){
    if(results && results.values){
      return results?.values.some(val => val && val.toLowerCase().includes(word.toLowerCase()));
    }
    else{
      return false;
    }
  }

  function nextButtonPressed() {
    if(onCompleted){
      onCompleted();
    }
  }

  return (
    <View style={SayWordStyling.host}>
      <View style={SayWordStyling.wordContainer}>{word ? <WordCardComponent style={SayWordStyling.wordStyling} model={word} ></WordCardComponent> : <></>}</View>
      { word && !canContinue && <SpeechButton style={SayWordStyling.micStyling} onSpeechCompleted={speechResultsHandler}></SpeechButton> }
      {canContinue && <SpeechConfirmedButton style={SayWordStyling.micStyling}></SpeechConfirmedButton>}
      <PrimaryButtonComponent wrapperStyle={SayWordStyling.next} onPress={nextButtonPressed} disabled={!canContinue}>Next</PrimaryButtonComponent>
    </View>
  );
}

export default SayWordComponent;
