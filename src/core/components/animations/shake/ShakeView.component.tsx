// src/core/components/shake-view/ShakeView.component.tsx
import React from 'react';
import { Animated, ViewStyle } from 'react-native';
import { useShakeAnimation } from "../../../hooks/useShakeAnimation.ts";

export interface IShakeView {
  shake: () => void;
}

interface ShakeViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shouldShake?: boolean;
}

export const ShakeView = React.forwardRef<IShakeView, ShakeViewProps>(
  ({ children, style, shouldShake }, ref) => {
    const { shakeAnimation, shake } = useShakeAnimation();

    React.useImperativeHandle(ref, () => ({
      shake
    }));

    React.useEffect(() => {
      if (shouldShake) {
        shake();
      }
    }, [shouldShake]);

    return (
      <Animated.View
        style={[
          style,
          {
            transform: [{ translateX: shakeAnimation }]
          }
        ]}
      >
        {children}
      </Animated.View>
    );
  }
);
