/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, View, Text, LayoutRectangle } from "react-native";
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
import { PanGestureHandler } from "react-native-gesture-handler";

function MatchTranslationComponent(args: {model: MatchTranslationModel}): React.JSX.Element {

  const logSource = "MatchTranslationComponent";

  const [words, setWords] = useState<WordCardModel[]>([]);
  const [translations, setTranslations] = useState<WordCardModel[]>([]);
  const [canContinue, setCanContinue] = useState(false);

  const activeHandlerId = useRef<number | null>(null); // Tracks the active handler
  const dragX = useRef<{[key: string]: Animated.Value}>({}); // Horizontal drag position
  const dragY = useRef<{[key: string]: Animated.Value}>({}); // Vertical drag position
  const cardRowLayouts = useRef<LayoutRectangle[]>([]); // Store `cardRow` item layouts
  const cardTranslationsLayouts = useRef<LayoutRectangle[]>([]); // Store `cardRow` item layouts

// Initialize drag positions for each word
  args.model.words.forEach((_, index) => {
    if (!dragX.current[index]) {
      dragX.current[index] = new Animated.Value(0);
    }
    if (!dragY.current[index]) {
      dragY.current[index] = new Animated.Value(0);
    }
  });

  // Gesture Handler
  const onGestureEvent = (index) => {
    //if(!activeHandlerId.current || index === activeHandlerId.current) {
      Logger.log(logSource, "dragging index = " + index, false, { x: dragX.current[index], y: dragY.current[index] });
      return Animated.event(
        [
          {
            nativeEvent: {
              translationX: dragX.current[index],
              translationY: dragY.current[index],
            },
          },
        ],
        { useNativeDriver: false } // Ensures animations run smoothly on the UI thread
      );
    //}
  }

  const onHandlerStateChange = (index: number, event: any) => {

    const { state } = event.nativeEvent;
    Logger.log(logSource, "onHandlerStateChangee: index = " +index + ", state = " + state + ", current active = " +  activeHandlerId.current);

    if (state === 2) {
      const finalX = event.nativeEvent.absoluteX;
      const finalY = event.nativeEvent.absoluteY;

      console.log(`current loc: [${preattifyNum(finalX)}, ${preattifyNum(finalY)}]`, false,dragX.current[index].__getValue() );

      // Gesture ACTIVE
      activeHandlerId.current = index;
    } else if (state === 5) {

      // Get the dragged view's initial position and size
      const draggedLayout = cardTranslationsLayouts.current[index]; // Assume this is the layout saved for the dragged view
      const draggedInitialLeft = draggedLayout?.x || 0;
      const draggedInitialTop = draggedLayout?.y || 0;
      const draggedWidth = draggedLayout?.width || 0;
      const draggedHeight = draggedLayout?.height || 0;
      console.log(`initial: left: ${preattifyNum(draggedInitialLeft)} top: ${preattifyNum(draggedInitialTop)} width: ${preattifyNum(draggedWidth)} height: ${preattifyNum(draggedHeight)}`);
      // Add translation offsets to calculate the new position
      const draggedTranslationX = dragX.current[index].__getValue(); // Get the current dragX.current value
      const draggedTranslationY = dragY.current[index].__getValue(); // Get the current dragY.current value
      const draggedLeft = draggedInitialLeft + draggedTranslationX;
      const draggedTop = draggedInitialTop + draggedTranslationY;
      const draggedRight = draggedLeft + draggedWidth;
      const draggedBottom = draggedTop + draggedHeight;

      // Check for overlap with each WordCardComponent layout
      cardRowLayouts.current.forEach((layout, targetIndex) => {
        const targetLeft = layout.x;
        const targetTop = layout.y;
        const targetRight = layout.x + layout.width;
        const targetBottom = layout.y + layout.height;
        console.log(`drag: [${preattifyNum(draggedLeft)} - ${preattifyNum(draggedRight)},${preattifyNum(draggedTop)} - ${preattifyNum(draggedBottom)}] target: [${preattifyNum(targetLeft)} - ${preattifyNum(targetRight)},${preattifyNum(targetTop)} - ${preattifyNum(targetBottom)}](x: ${draggedTranslationX},y: ${draggedTranslationY})`);
        const isOverlapping =
          draggedLeft < targetRight &&
          draggedRight > targetLeft &&
          draggedTop < targetBottom &&
          draggedBottom > targetTop;

        if (isOverlapping) {
          console.log(`Dragged view overlaps with WordCardComponent at index ${targetIndex}`);
          // Perform your matching logic here
        } else {
          console.log(`No overlap with WordCardComponent at index ${targetIndex}`);
        }
      });


      /*// Check if dragged item overlaps with any cardRow item
      const finalX = event.nativeEvent.absoluteX;
      const finalY = event.nativeEvent.absoluteY;

      cardRowLayouts.current.forEach((layout, targetIndex) => {
        if (
          finalX > layout.x &&
          finalX < layout.x + layout.width &&
          finalY > layout.y &&
          finalY < layout.y + layout.height
        ) {
          console.log(`IN LAYOUT ${targetIndex}: final: [${preattifyNum(finalX)}, ${preattifyNum(finalY)}], x: [${preattifyNum(layout.x)} - ${preattifyNum(layout.x + layout.width)}], y: [${preattifyNum(layout.y)} - ${preattifyNum(layout.y + layout.height)}]`);
          // Perform an action here (e.g., mark as matched)
        }
        else{

          console.log(`Not in layout ${targetIndex}: final: [${preattifyNum(finalX)}, ${preattifyNum(finalY)}], x: [${preattifyNum(layout.x)} - ${preattifyNum(layout.x + layout.width)}], y: [${preattifyNum(layout.y)} - ${preattifyNum(layout.y + layout.height)}]`);
        }
      });*/


      // Gesture END or CANCELLED
        activeHandlerId.current = null;

        // Reset position
        Animated.spring(dragX.current[index], { toValue: 0, useNativeDriver: true }).start();
        Animated.spring(dragY.current[index], { toValue: 0, useNativeDriver: true }).start();
      }
  };

  function preattifyNum(num:Number){
    //Logger.log(logSource, "preattifyNum " + num);
    return num.toFixed(0);
  }

  const saveCardRowLayout = (event: any, index: number,word: WordCardModel) => {
    const layout = event.nativeEvent.layout;
    console.log(`initializing word layout ${index} word ${word.word}: x: [${preattifyNum(layout.x)} - ${preattifyNum(layout.x + layout.width)}], y: [${preattifyNum(layout.y)} - ${preattifyNum(layout.y + layout.height)}]`);
    cardRowLayouts.current[index] = layout;
  };

  const saveCardTranslationLayout = (event: any, index: number,word: WordCardModel) => {
    const layout = event.nativeEvent.layout;
    console.log(`initializing translation layout ${index} word ${word.word}: x: [${preattifyNum(layout.x)} - ${preattifyNum(layout.x + layout.width)}], y: [${preattifyNum(layout.y)} - ${preattifyNum(layout.y + layout.height)}]`);
    cardTranslationsLayouts.current[index] = layout;
  };

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
    AudioManager.playSound({
      text: "Find the correct matches",
      language: appProducer.getSelectedLanguage(),
      soundKey: ""
    });
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
              onLayout={(event) => saveCardRowLayout(event, i, word)}>
              <WordCardComponent model={word}></WordCardComponent>
            </View>
          })
        }
      </View>

      <View style={MatchTranslationStyling.translationsRow}>
        {translations.map((word, i) => {
          return <PanGestureHandler
            key={"gesture_translation_" + i}
            onGestureEvent={onGestureEvent(i)}
              onHandlerStateChange={(event) => onHandlerStateChange(i, event)}
            >
              <Animated.View key={"translation_" + i}
                style={[MatchTranslationStyling.singleMatchItem,
                  {
                    transform: [
                      { translateX: dragX.current[i] },
                      { translateY: dragY.current[i] },
                    ],
                  },
                ]}
                onLayout={(event) => saveCardTranslationLayout(event, i, word)}
              >
                <WordCardComponent model={word} />
              </Animated.View>
            </PanGestureHandler>


        })}
      </View>

      <View style={MatchTranslationStyling.nextContainer}><NextButtonComponent onPress={nextButtonPressed} disabled={!canContinue}></NextButtonComponent></View>
    </View>
  );
}

export default MatchTranslationComponent;
