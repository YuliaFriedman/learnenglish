import {
  Animated,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  PanResponderGestureState,
  Text,
  View,
  ViewStyle
} from "react-native";
import { cloneElement, isValidElement, ReactElement, useRef, useState } from "react";
import { draggableStyle } from "./draggable.style.tsx";
import { Logger } from "../../../logger/Logger.ts";
import { DroppableComponentType } from "../droppable/droppable.component.tsx";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

export type DraggableComponentProps<T = {}> = {
  children: ReactElement<T>; // Ensure children accept `isDragging` as a prop
  droppableComponents: DroppableComponentType[];
  onDrag?: (layoutIndex: number|undefined) => void;
  onDrop?: (layoutIndex: number) => void;
  style?: StyleProp<ViewStyle>;
};

const DraggableComponent = <T,>({ children, onDrop, droppableComponents, style }: DraggableComponentProps<T>): JSX.Element => {

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
        pan.setOffset({
          //@ts-ignore
          x: pan.x._value,
          //@ts-ignore
          y: pan.y._value,
        });

          pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (event, gestureState) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false })(event, gestureState);
        const currentTargetLayoutIndex = droppableComponents.findIndex((dc, i) => isInsideLayout(dc.getLayout(), gestureState, i))

        if(currentTargetLayoutIndex >=0){
          droppableComponents[currentTargetLayoutIndex].onDrag();
        }
        else{
          droppableComponents.forEach(dc => dc.onNoDrag());
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        setIsDragging(false);
        pan.flattenOffset();

        const lauoutToDropIndex = droppableComponents.findIndex((dc, i) => isInsideLayout(dc.getLayout(), gestureState, i));

        if(lauoutToDropIndex != undefined && lauoutToDropIndex >= 0 && droppableComponents[lauoutToDropIndex].canDrop){
          if(onDrop){
            onDrop(lauoutToDropIndex);
            droppableComponents[lauoutToDropIndex].onDrop();
          }
        }
        else{
          pan.setValue({ x: 0, y: 0 });
        }
      },

  });

  const isInsideLayout = (layout:LayoutRectangle|null, gestureState: PanResponderGestureState, layoutIndex:number) => {
    const elementX = gestureState.moveX;
    const elementY = gestureState.moveY;

    const isInside = layout && elementX > layout.x &&
    elementX < layout.x + layout.width &&
    elementY > layout.y &&
    elementY < layout.y + layout.height;

    //Logger.log(logSource, `Is Inside ${layoutIndex} = ${isInside}: gesture = [${elementX.toFixed(2)},${elementY.toFixed(2)}] layout = [{${layout?.x.toFixed(2)} - ${(layout?.x + layout?.width).toFixed(2)}}, {${layout.y.toFixed(2)} - ${(layout.y + layout.height).toFixed(2)}}]`)

    return isInside;
  }

  return (
    <Animated.View

      style={[pan.getLayout(), draggableStyle.draggable, style]}
      {...panResponder.panHandlers}
    >

      {children}

    </Animated.View>
  );

};

export default DraggableComponent;
