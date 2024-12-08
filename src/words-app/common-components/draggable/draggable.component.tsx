import { Animated, PanResponder, Text, View } from "react-native";
import { useRef, useState } from "react";
import { draggableStyle } from "./draggable.style";
import { Logger } from "../../../logger/Logger";

const Draggable = ({ centralRefs, children }) => {
  const logSource = "Draggable";
  Logger.log(logSource, "in Draggable");
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      Logger.log(logSource, "in onPanResponderGrant");
      return true
    },

    onPanResponderGrant: () => {
      Logger.log(logSource, "in onPanResponderGrant");
      //@ts-ignore
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },

    onPanResponderMove: () => {
      Logger.log(logSource, "in onPanResponderMove");
      return Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      )
    },

    onPanResponderRelease: (_, gestureState) => {
      Logger.log(logSource, "in onPanResponderRelease");
      pan.flattenOffset();

      let isInsideAnyCentral = false;

      centralRefs.current.forEach((centralRef, index) => {
        centralRef.measure((fx, fy, w, h, px, py) => {
          const isInsideCentral =
            gestureState.moveX >= px &&
            gestureState.moveX <= px + w &&
            gestureState.moveY >= py &&
            gestureState.moveY <= py + h;

          if (isInsideCentral) {
            isInsideAnyCentral = true;
            console.log("Dragged inside!!");
            // Snap to the center of the current central view
            /*Animated.spring(pan, {
              toValue: { x: px - initialPosition.x, y: py - initialPosition.y },
              useNativeDriver: false,
            }).start();*/
          }
        });
      });

      // If not inside any central view, return to original position
      if (!isInsideAnyCentral) {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), draggableStyle.draggable]}
    >
      {children}
    </Animated.View>
  );
};

const DraggableComponent = ({children}) => {

  const [pan, setPan] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({

    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
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

      pan.flattenOffset();

    },

  });

  return (

    <Animated.View

      style={[pan.getLayout(), draggableStyle.draggable]}

      {...panResponder.panHandlers}

    >

      <Text>Hello</Text>

    </Animated.View>

  );

};

export default DraggableComponent;
