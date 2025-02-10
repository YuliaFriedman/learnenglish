/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { Logger } from "../../../logger/Logger";
import { ButtonModel } from "./buttonModel";
import { ButtonStyling } from "./button.styling";

function ButtonComponent(model: ButtonModel): React.JSX.Element {

  const logSource = "ButtonComponent";

  useEffect(() => {

  }, []);

  function buttonPressed(){
    Logger.log(logSource, "Button pressed");
    if(model.onPress){
      model.onPress();
    }
  }

  return (
    <Pressable
      style={(pressed) => [ButtonStyling.host, model.style?.buttonStyle, model.disabled && ButtonStyling.hostDisabled]}
      onPress={buttonPressed}
      disabled={model.disabled}>
        {typeof model.children === "string" ? (
        <Text style={[ButtonStyling.text, model.style?.textStyle]}>
          {model.children}
        </Text>
      ) : (
        model.children
      )}
    </Pressable>
  );
}

export default ButtonComponent;