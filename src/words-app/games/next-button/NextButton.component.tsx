/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { NextButtonModel } from "./NextButtonModel";
import { Logger } from "../../../logger/Logger";
import { images } from "../../app-data/ImagesManager";
import { NextButtonStyling } from "./NextButton.styling";

function NextButtonComponent(model: NextButtonModel): React.JSX.Element {

  const logSource = "NextButtonComponent";

  useEffect(() => {

  }, []);

  function buttonPressed(){
    Logger.log(logSource, "Next button pressed");
    if(model.onPress){
      model.onPress();
    }
  }

  return (
    <Pressable
      style={(pressed) => [NextButtonStyling.host, model.disabled && NextButtonStyling.hostDisabled]}
      onPress={buttonPressed}
      disabled={model.disabled}>
      <Text style={NextButtonStyling.text}>Next</Text>
    </Pressable>
  );
}

export default NextButtonComponent;
