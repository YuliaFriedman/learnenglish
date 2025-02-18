import { forwardRef, ReactElement, useImperativeHandle, useRef } from "react";
import { Animated, LayoutChangeEvent, LayoutRectangle, View } from "react-native";
import { Logger } from "../../../logger/Logger.ts";
import { AnimatedInterpolation } from "react-native/Libraries/Animated/Animated";

export interface DroppableHighlightSetting {
    cssProperty: string;
    value: any;
    defaultValue: any;
}

export interface DroppableComponentType {
    onDrag: () => void;
    getLayout: () => LayoutRectangle|null;
    onNoDrag: () => void;
    onDrop: () => void;
    canDrop: boolean;
  }

export type DroppableComponentProps<T = {}> = {
    children: ReactElement<T>;
    highlightSettings: DroppableHighlightSetting[];
    canDrop: boolean;
}

const DroppableComponent = forwardRef<DroppableComponentType, DroppableComponentProps>(({children, highlightSettings, canDrop}: DroppableComponentProps, ref) => {

    const logSource = "DroppableComponentProps";

    const dropRefs = useRef<View|null>(null);
    const layout = useRef<LayoutRectangle|null>(null);
    const dropZoneColors = useRef<Animated.Value>(new Animated.Value(0));

    const handleLayout = () => (event: LayoutChangeEvent) => {
        dropRefs.current && dropRefs.current.measureInWindow((x, y, width, height) => {
            Logger.log(logSource, `Measured layout: x=${x}, y=${y}, width=${width}, height=${height}`);
            layout.current = { x: x, y: y, width, height };
       });
    };

    const onDrag = () => {
        if(canDrop){
            updateTargetHighlight(1);
        }
    }

    const onNoDrag = () => {
        if(canDrop){
            updateTargetHighlight(0);
        }
    }

    const onDrop = () => {
        if(canDrop){
            updateTargetHighlight(0);
        }
    }

    const getLayout = () => {
        return layout?.current;
    }

    useImperativeHandle(ref, () => ({
        onDrag,
        getLayout,
        onNoDrag,
        onDrop,
        canDrop
    }));

    function updateTargetHighlight(highlightVal: 0|1){
        Animated.timing(dropZoneColors.current, {
        toValue: highlightVal,
        duration: 10,
        useNativeDriver: false
        }).start();
    }

    function getDropBG(){
        let results:{[key: string]:AnimatedInterpolation } = {};
        highlightSettings.forEach(settings => {
            results[settings.cssProperty] = dropZoneColors.current.interpolate({
                inputRange: [0, 1],
                outputRange: [settings.defaultValue, settings.value]
            });
        });

        return results;
    }


    return <Animated.View
            onLayout={handleLayout()}
            ref={(viewRef) => dropRefs.current = viewRef}
            style={[getDropBG()]}>
            {children}
        </Animated.View>
});

export default DroppableComponent;
