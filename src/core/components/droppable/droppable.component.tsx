import { forwardRef, ReactElement, useImperativeHandle, useRef } from "react";
import { Animated, LayoutChangeEvent, LayoutRectangle, View, ViewStyle } from "react-native";
import { Logger } from "../../../logger/Logger.ts";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

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
    onDrag?: () => void;
    onNoDrag?: () => void;
    onDrop?: () => void;
    style?: StyleProp<ViewStyle>;
}

const DroppableComponent = forwardRef<DroppableComponentType, DroppableComponentProps>(({children, highlightSettings, canDrop, onDrag, onNoDrag, onDrop, style}: DroppableComponentProps, ref) => {

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

    const onDragInner = () => {
        if(canDrop){
            updateTargetHighlight(1);
        }
        if(onDrag){
            onDrag();
        }
    }

    const onNoDragInner = () => {
        if(canDrop){
            updateTargetHighlight(0);
        }
        if(onNoDrag){
            onNoDrag();
        }
    }

    const onDropInner = () => {
        if(canDrop){
            updateTargetHighlight(0);
        }
        if(onDrop){
            onDrop();
        }
    }

    const getLayout = () => {
        return layout?.current;
    }

    useImperativeHandle(ref, () => ({
        onDrag: onDragInner,
        getLayout,
        onNoDrag: onNoDragInner,
        onDrop: onDropInner,
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
        let results:{[key: string]:Animated.AnimatedInterpolation<any> } = {};
        highlightSettings.forEach(settings => {
            results[settings.cssProperty] = dropZoneColors.current.interpolate({
                inputRange: [0, 1],
                outputRange: [settings.defaultValue, settings.value]
            });
        });
        Logger.log(logSource, "getDropBG: " + JSON.stringify(results));
        return results;
    }


    return <Animated.View
            onLayout={handleLayout()}
            // @ts-ignore
            ref={(viewRef) => dropRefs.current = viewRef}
            style={[style, getDropBG()]}>
            {children}
        </Animated.View>
});

export default DroppableComponent;
