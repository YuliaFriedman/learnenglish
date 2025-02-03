import { Animated, LayoutChangeEvent, LayoutRectangle, PanResponder, PanResponderGestureState, Text, View } from "react-native";
import { cloneElement, isValidElement, ReactElement, useRef, useState } from "react";
import { draggableStyle } from "./draggable.style";
import { Logger } from "../../../logger/Logger";

export type DraggableComponentProps<T = {}> = {
  children: ReactElement<T & { isDragging: boolean }>; // Ensure children accept `isDragging` as a prop
  dropLayouts: React.RefObject<any[]>;
  onDrag: (layoutIndex: number|undefined) => void
};

const DraggableComponent = <T,>({ children, dropLayouts, onDrag }: DraggableComponentProps<T>): JSX.Element => {

  const logSource = "DraggableComponentProps";

  const [pan, setPan] = useState(new Animated.ValueXY());
  const [isDragging, setIsDragging] = useState(false);
  const elementLayout = useRef({ width: 0, height: 0 });
  
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

      onPanResponderMove: (event, gestureState) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false })(event, gestureState);
        const currentTargetLayoutIndex = dropLayouts?.current?.findIndex(layout => {
          return isInsideLayout(layout, gestureState);
        });
        
        // Save the current position during the drag
        //Logger.log(logSource, `In Move: drap possition = [${gestureState.moveX.toFixed(2)}, ${gestureState.moveY.toFixed(2)}], layouts = ${dropLayouts?.current?.length} [${dropLayouts?.current?.map(item => item.x + ", " + item.y)}]`);

        onDrag(currentTargetLayoutIndex); // Call the drag handler with the current position
        
      },

      onPanResponderRelease: (e, gestureState) => {
        setIsDragging(false);
        pan.flattenOffset();

        let dropped = false;
        Logger.log(logSource, `In droping: ${dropLayouts?.current?.map(item => JSON.stringify(item))}`);
        const lauoutToDrop = dropLayouts?.current?.find(layout => {
          return isInsideLayout(layout, gestureState);
        });

        if(lauoutToDrop){
          Logger.log(logSource, "Dropping layout found: Drag pos: [" + gestureState.moveX + ", " + gestureState.moveY + "] layout pos: [" + lauoutToDrop.x + "(" + lauoutToDrop.width + "), " + lauoutToDrop.y + "(" + lauoutToDrop.height + ")]");
          dropped = true;
        }
        else{
          pan.setValue({ x: 0, y: 0 });
        }
      },

  });

  const isInsideLayout = (layout:LayoutRectangle, gestureState: PanResponderGestureState) => {
    const elementX = gestureState.moveX - elementLayout.current.width / 2;
    const elementY = gestureState.moveY - elementLayout.current.height / 2;

    return  elementX > layout.x &&
    elementX < layout.x + layout.width &&
    elementY > layout.y &&
    elementY < layout.y + layout.height
  }

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
