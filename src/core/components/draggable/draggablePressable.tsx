import { StyleSheet, View } from "react-native";
import { ReactElement, useRef, useState } from "react";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";

export interface DraggableProps<T = {}> {
  onPress?: () => void;
  children: ReactElement<T>;
}

export function DraggablePressable({onPress, children}:DraggableProps){
  const [isDragging, setIsDragging] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 }); // Reference for the initial touch position
  const [dragThreshold] = useState(2); // Set a threshold for detecting drag

  const onStartShouldSetResponder = (e:GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    touchStart.current = { x: pageX, y: pageY }; // Store the initial touch position
    console.log('Touch started at:', touchStart.current);
    return false; // Allow touch to propagate to other elements (not capturing for drag)
  };

  //onTouchMove will track the movement and set `isDragging` once the threshold is exceeded
  const onTouchMove = (e:GestureResponderEvent) => {
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

  //onTouchEnd will determine whether it was a drag or tap
  const onTouchEnd = () => {
    if (isDragging) {
      console.log('Drag performed');
      // You can handle drag end logic here
    } else {
      console.log('Tap performed');
      if(onPress){
        onPress();
      }
    }

    // Reset dragging state after touch ends
    setIsDragging(false);
  };

  return (
    <View style={styles.host}
      onStartShouldSetResponder={onStartShouldSetResponder}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}>
      {children}
    </View>

  );
}


const styles = StyleSheet.create({
  host: {
    height: "100%",
    width: "100%"
  }
});
