/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { Logger } from "../../../logger/Logger.ts";
import { GradientLayout } from "../gradient-layout/GradientLayout.tsx";
import { ButtonModel } from "./ButtonModel.ts";
import { ButtonStyling } from "./Button.styling.tsx";
import { ThemeManager } from "../../../words-app/style/ThemeManager.ts";

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
      style={[model.style?.buttonStyle, model.disabled && ButtonStyling.hostDisabled]}
      onPress={buttonPressed}
      disabled={model.disabled}>
      {({pressed}) => (
      <GradientLayout
        style={[ButtonStyling.inner, model?.disabled && ButtonStyling.hostDisabled]}
        model={
          pressed
            ? Object.assign({}, model?.style?.backgroundStyle || ThemeManager.theme.buttons.defaultButton.bg, model?.style?.pressedButtonStyle)
            : (model?.style?.backgroundStyle || ThemeManager.theme.buttons.defaultButton.bg)}>
        {typeof model.children === "string" ? (
        <Text style={[ButtonStyling.text, model.style?.textStyle]}>
          {model.children}
        </Text>
      ) : (
        model.children
      )}
      </GradientLayout>
        )}
    </Pressable>
  );
}

export default ButtonComponent;
