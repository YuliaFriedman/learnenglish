/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Animated, InteractionManager, LayoutChangeEvent, LayoutRectangle, View } from "react-native";
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

function MatchTranslationComponent(args: {model: MatchTranslationModel}): React.JSX.Element {

  const logSource = "MatchTranslationComponent";

  const [words, setWords] = useState<WordCardModel[]>([]);
  const [translations, setTranslations] = useState<WordCardModel[]>([]);
  const [canContinue, setCanContinue] = useState(false);
  const dropRefs = useRef<View[]>([]);
  const dropLayouts = useRef<LayoutRectangle[]>([]);
  const  dropZoneColors = useRef<Animated.Value[]>([]);
  const defaultAnimatedValue = new Animated.Value(0)

  useEffect(() => {
    initData();
  }, []);


  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
    Logger.log(logSource, `In useEffect...${dropRefs.current.length}`);
    // Measure layouts after initial render
      dropRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.measure((x, y, width, height, pageX, pageY) => {
            Logger.log(logSource, `Measured layout for index ${index}: x=${pageX}, y=${pageY}, width=${width}, height=${height}`);
            dropLayouts.current[index] = { x: pageX, y: pageY, width, height };
          });
        }
        else{
          Logger.log(logSource, `ref is null ${index}`);
        }
      });
    }); 
  }, [words, translations]);

  // Using onLayout
  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    Logger.log(logSource, `onLayout for index ${index}: x=${x}, y=${y}, width=${width}, height=${height}`);
    dropLayouts.current[index] = { x, y, width, height };
  };


  function initData(){
    const selectedLanguage = appProducer.getSelectedLanguage();
    const selectedTranslation = appProducer.getSelectedTranslation();
    const wordsList:WordCardModel[] = [];
    const translationsList:WordCardModel[] = [];
    dropZoneColors.current = [];

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

      dropZoneColors.current = [...dropZoneColors.current, new Animated.Value(0)];
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

  function onDragToLayout(index: number | undefined) {
    //Logger.log(logSource, `in onDragToLayout: dropZoneColors length = ${dropZoneColors.current.length}, target: ${index}`);
    dropZoneColors.current.forEach((dropZoneColor, i) => {
      Animated.timing(dropZoneColor, {
        toValue: index === i ? 1 : 0,
        duration: 10,
        useNativeDriver: false
      }).start();

    });
  }

  return (
    <View style={MatchTranslationStyling.host}>
      <View style={MatchTranslationStyling.cardRow}>
        {
          words.map((word, i) => {
            const dropZoneBackgroundColor = dropZoneColors.current.length > i ? dropZoneColors.current[i].interpolate({
              inputRange: [0, 1],
              outputRange: ["red", "yellow"]
            }) : defaultAnimatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["red", "yellow"]
            });
            return <Animated.View  
                onLayout={handleLayout(i)}
                ref={(ref) => (dropRefs.current[i] = ref)}
                key={"words_" + i} 
                style={[MatchTranslationStyling.wordCard, { backgroundColor: dropZoneBackgroundColor }]}>
              <View
                //style={[MatchTranslationStyling.wordCard, draggedLayout === i && MatchTranslationStyling.draggedLayout]}
                //style={[MatchTranslationStyling.wordCard, { backgroundColor: dropZoneBackgroundColor }]}
                style={{height: "100%"}}
                >
                <WordCardComponent model={word} ></WordCardComponent>
              </View>
            </Animated.View>
          })
        }
      </View>

      <View style={MatchTranslationStyling.translationsRow}>
        {translations.map((word, i) => {
          return <View key={"translation_" + i}
                           style={[MatchTranslationStyling.singleMatchItem]}
                           >
              <DraggableComponent dropLayouts={dropLayouts} centralRefs={dropRefs} onDrag={onDragToLayout}>
                <WordCardComponent model={word} />
              </DraggableComponent>
            </View>



        })}
      </View>

      <View style={MatchTranslationStyling.nextContainer}><NextButtonComponent onPress={nextButtonPressed} disabled={!canContinue}></NextButtonComponent></View>
    </View>
  );
}

export default MatchTranslationComponent;
