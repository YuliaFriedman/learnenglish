import { Animated, StyleSheet, ViewStyle } from "react-native";
import { IconButton } from "../../../../core/components/icon-button/IconButton.tsx";
import React, { useEffect, useRef, useState } from "react";
import { SpeechResults, SpeechToTextManager } from "../../../../sound/SpeechToTextManager.ts";
import { Logger } from "../../../../logger/Logger.ts";
import { ThemeManager } from "../../../style/ThemeManager.ts";

interface MicButtonProps {
    style?: ViewStyle;
    disabled?: boolean;
    onSpeechStarted?: () => void;
    onSpeechCompleted? : (results:SpeechResults) => void
}

export function SpeechButton({ style, disabled, onSpeechStarted, onSpeechCompleted }: MicButtonProps){

  const logSource = "SpeechButton";

  const scaleValue = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  let [isListening, setIsListening] = useState(false);

  useEffect(() => {
    SpeechToTextManager.init(speechStartHandler, speechEndHandler, speechResultsHandler);
    startAnimation();

    return () => {
      SpeechToTextManager.destroy();
      stopAnimation();
    };

  }, []);

  function speechStartHandler() {
    setIsListening(true);
  }

  function speechEndHandler(){
    setIsListening(false);
    startAnimation();
  }

  function speechResultsHandler(results:SpeechResults){
    if(onSpeechCompleted){
      onSpeechCompleted(results);
    }
  }

  function micPressed(){
    Logger.log(logSource, "mic pressed");
    stopAnimation();
    SpeechToTextManager.start();
    if(onSpeechStarted){
      onSpeechStarted();
    }
  }

  const startAnimation = () => {
    // Start looping animation
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.10, // Scale up
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Scale back down
          duration: 300,
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
    <Animated.View style={[styling.micContainer, style, { transform: [{ scale: scaleValue }] }, (disabled || isListening) && styling.micContainerDisabled]}>
      <IconButton icon="microphone" size={40} onPress={micPressed} disabled={disabled || isListening} iconColor="white"></IconButton>
    </Animated.View>
  )
}

const styling = StyleSheet.create({
  micContainer: {
    alignSelf: "center",
    backgroundColor: ThemeManager.theme.buttons.speechButton.backgroundColor,
    borderRadius: 200,
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  micContainerDisabled: {
    opacity: 0.5
  }
});
