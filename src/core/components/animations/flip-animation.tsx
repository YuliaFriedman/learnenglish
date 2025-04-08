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
    <View style={flipCardStyles.host}>
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
  host: {
    position: 'relative'
  },
  regularCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    borderWidth: 4,
    borderColor: "red"
  },
  flippedCard: {
    top: 0,
    left: 0,
    zIndex: 2,
    borderWidth: 4,
    borderColor: "blue"
  },
});
