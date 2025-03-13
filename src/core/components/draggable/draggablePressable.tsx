import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { ReactElement, useRef, useState } from "react";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { Logger } from "../../../logger/Logger.ts";

interface PressableStateCallbackType {
  pressed: boolean;
}

export interface DraggableProps<T = {}> {
  onPress?: () => void;
  children: ReactElement<T> | ((state: PressableStateCallbackType) => ReactElement<T>);
  style?: StyleProp<ViewStyle>;
}

export function DraggablePressable({onPress, children, style}:DraggableProps){
  const logSource = 'DraggablePressable';
  const [isDragging, setIsDragging] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 }); // Reference for the initial touch position
  const [dragThreshold] = useState(4); // Set a threshold for detecting drag

  const onPressIn = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    touchStart.current = { x: pageX, y: pageY }; // Store the initial touch position
    console.log('Touch started at:', touchStart.current);
  };

  //onTouchMove will track the movement and set `isDragging` once the threshold is exceeded
  const onTouchMove = (e:GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;

    // Calculate the distance moved from the starting touch position
    const dx = Math.abs(pageX - touchStart.current.x);
    const dy = Math.abs(pageY - touchStart.current.y);

    Logger.log(logSource, `onTouchMove dx: ${dx}, dy: ${dy}`);

    // If movement exceeds threshold, mark it as a drag
    if (dx > dragThreshold || dy > dragThreshold) {
      if (!isDragging) {
        console.log('Started dragging');
        setIsDragging(true);
      }
    }
  };


  const onPressOut = () => {
    if (isDragging) {
      console.log('Drag performed');
      // You can handle drag end logic here
    } else {
      console.log('Tap performed');
      if (onPress) {
        onPress();
      }
    }

    // Reset dragging state after touch ends
    setIsDragging(false);
  };

  return (
    <Pressable style={[styles.host, style]}
       onPressIn={onPressIn}
      onTouchMove={onTouchMove}
       onPressOut={onPressOut}
      >
      { state => typeof children === 'function' ? children(state) : children }
    </Pressable>
  );
}


const styles = StyleSheet.create({
  host: {
    height: "100%",
    width: "100%"
  }
});
