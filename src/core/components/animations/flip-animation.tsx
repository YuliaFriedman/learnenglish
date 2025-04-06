// import Animated, {
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native/types';
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native";
import { ReactNode } from "react";
import Animated, { interpolate, withTiming } from 'react-native-reanimated';

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
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});
