import { StyleSheet, View, ViewStyle } from "react-native";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { StepModel, StepStatus } from "../../app-data/models/StepModel.ts";

export interface StepProgressIconProps {
  step: StepModel;
  style?: ViewStyle;
}

export function StepProgressIcon ({step, style}: StepProgressIconProps) {

  function getStarIcon(status:StepStatus) {
    switch (status) {
      case StepStatus.Idle:
        return <Icon name="star-o" size={30} color="black"/>
      case StepStatus.Skipped:
        return <Icon name="star-half-empty" size={30} color="black"/>
      case StepStatus.Completed:
        return <Icon name="star" size={30} color="black"/>
    }
  }

  return (
    <View style={style}>
      <View style={ProgressIconStyling.icon}>
        <Icon name="star" size={30} color="white"/>
      </View>
      <View style={ProgressIconStyling.icon}>
        {getStarIcon(step.status)}
      </View>
    </View>
  )
}

const ProgressIconStyling = StyleSheet.create({
  icon: {
    position: "absolute",
  }
});
