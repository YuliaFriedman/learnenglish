/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { WordCardModel } from "./WordCardModel";
import { Logger } from "../../../logger/Logger";
import { images } from "../../app-data/ImagesManager";
import { WordCardStyling } from "./WordCard.styling";
import { AudioManager } from "../../../sound/AudioManager";
import { Languages } from "../../../app-data/language";

function WordCardComponent(args: {model: WordCardModel, isDisabled: boolean }): React.JSX.Element {

  const logSource = "WordCardComponent";

  const [isDragging, setIsDragging] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 }); // Reference for the initial touch position
  const [dragThreshold] = useState(2); // Set a threshold for detecting drag

  useEffect(() => {
    if(args?.model?.shouldSayTheWord){
      playSound();
    }
  }, [args?.model?.shouldSayTheWord]);

  function playSound(){
    if(args?.model){
      Logger.log(logSource, "Playing sound " + args?.model?.word + "(" + args?.model?.language + ") - img = " + args?.model?.image);
      if(args?.model?.onSpeakStarted){
        args?.model?.onSpeakStarted();
      }
      AudioManager.playSound({
        text: args.model.word,
        soundKey: args.model.sound,
        language: args.model.language
      }).then(() => {
        Logger.log(logSource, "Play sound completed for word " + args.model.word);
        if(args.model?.onSpeakCompleted){
          args.model.onSpeakCompleted();
        }
      });
    }
  }

  const onStartShouldSetResponder = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    touchStart.current = { x: pageX, y: pageY }; // Store the initial touch position
    console.log('Touch started at:', touchStart.current);
    return false; // Allow touch to propagate to other elements (not capturing for drag)
  };

  // onTouchMove will track the movement and set `isDragging` once the threshold is exceeded
  const onTouchMove = (e) => {
    const { pageX, pageY } = e.nativeEvent;

    // Calculate the distance moved from the starting touch position
    const dx = Math.abs(pageX - touchStart.current.x);
    const dy = Math.abs(pageY - touchStart.current.y);

    // If movement exceeds threshold, mark it as a drag
    if (dx > dragThreshold || dy > dragThreshold) {
      if (!isDragging) {
        console.log('Started dragging');
        setIsDragging(true);
      }
    }
  };

  // onTouchEnd will determine whether it was a drag or tap
  const onTouchEnd = () => {
    if (isDragging) {
      console.log('Drag performed');
      // You can handle drag end logic here
    } else {
      console.log('Tap performed');
      buttonPressed(); // Handle tap
    }

    // Reset dragging state after touch ends
    setIsDragging(false);
  };

  function buttonPressed(){
    if(!isDragging){
      if(args?.model?.pressable){
        playSound();
        if(args.model.onPressed){
          args.model.onPressed();
        }
      }
      else{
        Logger.log(logSource, "word card is not pressable " + args.model.word);
      }
    }
    setIsDragging(false);
  }

  return (
    <View
      style={[
        WordCardStyling.host,
        args?.model?.isSelected && WordCardStyling.selectedWordCard,
        args?.model?.isError && WordCardStyling.incorrectWordCard,
      ]}
      onStartShouldSetResponder={onStartShouldSetResponder}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <View
        style={[
          WordCardStyling.imageContainer,
          !args?.model?.imgVisible && WordCardStyling.invisibleImg
        ]}
      >
        <Image
          source={images[args?.model?.image]}
          style={WordCardStyling.img}
          resizeMode={"center"}
        />
      </View>
      {args?.model?.showText && <Text style={WordCardStyling.text}>{args.model.word}</Text>}
    </View>
  );
  /*
  return (
    <Pressable
      style={[
        WordCardStyling.host,
        args?.model?.isSelected && WordCardStyling.selectedWordCard,
        args?.model?.isError && WordCardStyling.incorrectWordCard
      ]}
      onPress={buttonPressed}
      onStartShouldSetResponder={() => false} // Let parent handle gestures
      onMoveShouldSetResponder={() => false} // Let parent handle gestures
     >
      <View
        style={[
          WordCardStyling.imageContainer,
          !args?.model?.imgVisible && WordCardStyling.invisibleImg
        ]}>
        <Image
          source={images[args?.model?.image]}
          style={WordCardStyling.img}
          resizeMode={"center"}
        />
      </View>
      {args?.model?.showText && <Text style={WordCardStyling.text}>{args.model.word}</Text>}
    </Pressable>
  );*/
}

export default WordCardComponent;
