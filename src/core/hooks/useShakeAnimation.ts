// src/core/hooks/useShakeAnimation.ts
import { useRef } from 'react';
import { Animated } from 'react-native';
import { Logger } from "../../logger/Logger.ts";

export function useShakeAnimation() {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const loggerSource = "useShakeAnimation";

  const shake = () => {
    Logger.log(loggerSource, 'In Shake')
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  return { shakeAnimation, shake };
}
