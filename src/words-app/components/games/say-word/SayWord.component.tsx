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
import { SpeechResults, SpeechToTextManager } from "../../../../sound/SpeechToTextManager";
import { IAppProducer } from "../../../app-data/store/IAppProducer.ts";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import { Languages } from "../../../../app-data/language.ts";
import { IAudioManager } from "../../../../sound/IAudioManager.ts";

function SayWordComponent(args: {model: SayWordModel}): React.JSX.Element {

  const logSource = "SayWordComponent";

  const [word, setWord] = useState<WordCardModel|undefined>(undefined);
  const [canContinue, setCanContinue] = useState(false);
  let [isListening, setIsListening] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [attempts, setAttempts] = useState(0);
  const maxNumOfAttempts = useRef(2);

  const appProducer = useRef<IAppProducer | null>(null);
  const audioManager = useRef<IAudioManager | null>(null);

  useEffect(() => {
    initInjections();
    initData();
    SpeechToTextManager.init(speechStartHandler, speechEndHandler, speechResultsHandler);
    startAnimation();
    return () => {
      SpeechToTextManager.destroy();
      stopAnimation();
    };
  }, []);

  useEffect(() => {
    if(attempts > maxNumOfAttempts.current){
      setCanContinue(true);
    }
  }, [attempts])

  function initInjections(){
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }
    if(!audioManager.current){
      audioManager.current = InjectionManager.useInjection<IAudioManager>(DepInjectionsTokens.AUDIO_MANAGER_TOKEN);
    }
  }

  function initData(){
    const selectedLanguage = appProducer.current?.getSelectedLanguage() || Languages.EN;
    const wordFromDictionary = dictionary.getWord(selectedLanguage, args.model.word);
    setWord(new WordCardModel({
      id: args.model.word,
      ...wordFromDictionary,
      pressable: true,
      shouldSayTheWord: false,
      language: selectedLanguage
    }));

    if(wordFromDictionary){
      audioManager.current?.playSound({
        text: "say the word",
        language: appProducer.current?.getSelectedLanguage() || Languages.EN,
        soundKey: ""
      }).then(() => {
        setTimeout(() => {
          audioManager.current?.playSound({
            text: wordFromDictionary.word,
            language: appProducer.current?.getSelectedLanguage() || Languages.EN,
            soundKey: ""
          });
        }, 400);
      });
    }
  }

  function micPressed(){
    stopAnimation();
    SpeechToTextManager.start();
  }

  function speechStartHandler() {
    setIsListening(true);
  }

  function speechEndHandler(){
    setIsListening(false);
  }

  function speechResultsHandler(results:SpeechResults){
    let hasWordInResults = word?.word && results && results.values && results.values.indexOf(word.word) >= 0;
    Logger.log(logSource, "has word in results: " + hasWordInResults, false, results);
    if(hasWordInResults){
      setCanContinue(true);
    }
    else{
      setAttempts(attempts => attempts + 1);
    }
  }

  function nextButtonPressed() {
    appProducer.current?.setNextStep();
  }

  const startAnimation = () => {
    // Start looping animation
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.05, // Scale up
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Scale back down
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    );
    animationRef.current?.start();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current?.stop();
    }
  };

  return (
    <View style={SayWordStyling.host}>
      <View style={SayWordStyling.spaceView}></View>
      <View style={SayWordStyling.wordContainer}>{word ? <WordCardComponent model={word} ></WordCardComponent> : <></>}</View>
      <Animated.View style={[SayWordStyling.micContainer, { transform: [{ scale: scaleValue }] }]}>
        <Pressable  onPress={micPressed} disabled={isListening}><Icon  name="microphone" size={30} color="white"/></Pressable>
      </Animated.View>
      <View style={SayWordStyling.nextContainer}><PrimaryButtonComponent onPress={nextButtonPressed} disabled={!canContinue}>Next</PrimaryButtonComponent></View>
    </View>
  );
}

export default SayWordComponent;
