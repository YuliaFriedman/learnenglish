import { Animated, PanResponder, Text, View } from "react-native";
import { cloneElement, isValidElement, ReactElement, useRef, useState } from "react";
import { draggableStyle } from "./draggable.style";
import { Logger } from "../../../logger/Logger";

export type DraggableComponentProps<T = {}> = {
  children: ReactElement<T & { isDragging: boolean }>; // Ensure children accept `isDragging` as a prop
};

const DraggableComponent = <T,>({ children }: DraggableComponentProps<T>): JSX.Element => {

  const logSource = "DraggableComponentProps";

  const [pan, setPan] = useState(new Animated.ValueXY());
  const [isDragging, setIsDragging] = useState(false);

  const panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => {
        // Allow the parent to capture gestures for dragging
        return true;
      },

      onPanResponderGrant: () => {
        setIsDragging(true);
        //@ts-ignore
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });

        pan.setValue({ x: 0, y: 0 });

      },

      onPanResponderMove: Animated.event(

        [null, { dx: pan.x, dy: pan.y }],

        { useNativeDriver: false }

      ),

      onPanResponderRelease: () => {
        setIsDragging(false);
        pan.flattenOffset();

        pan.setValue({ x: 0, y: 0 });
      },

  });

  // Clone the child and inject `isDragging`
  const childrenWithProps = isValidElement(children)
    ? cloneElement(children, { isDragging } as T & { isDragging: boolean })
    : children;

  return (

    <Animated.View

      style={[pan.getLayout(), draggableStyle.draggable]}

      {...panResponder.panHandlers}

    >

      {childrenWithProps}

    </Animated.View>

  );

};

export default DraggableComponent;
