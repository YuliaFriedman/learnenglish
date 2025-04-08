import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle, StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import Animated, { interpolate, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export interface FlipCardProps {
  isFlipped: boolean;
  cardStyle?: StyleProp<ViewStyle>;
  direction: 'y' | 'x';
  duration?: number;
  RegularContent: ReactNode;
  FlippedContent: ReactNode;
}

export function FlipCard  ({
                    isFlipped,
                    cardStyle,
                    direction = 'y',
                    duration = 500,
                    RegularContent,
                    FlippedContent,
                  }: FlipCardProps)  {
  const isDirectionX = direction === 'x';

  // @ts-ignore
  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [isDirectionX ? {rotateX: rotateValue} : { rotateY: rotateValue }]
    }
  });

  // @ts-ignore
  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}>
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    backfaceVisibility: 'hidden',
  },
  flippedCard: {
    zIndex: 2,
    backfaceVisibility: 'hidden',
  },
});
