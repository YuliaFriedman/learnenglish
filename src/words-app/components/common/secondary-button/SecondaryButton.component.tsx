/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { SecondaryButtonStyling } from "./SecondaryButton.styling.tsx";
import ButtonComponent from "../../../../core/components/button/Button.component.tsx";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { GradientLayout } from "../../../../core/components/gradient-layout/GradientLayout.tsx";
import { ButtonModel } from "../../../../core/components/button/ButtonModel.ts";
import { ViewStyle } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

interface SecondaryButtonComponentModel extends ButtonModel{
  wrapperStyle?: StyleProp<ViewStyle>;
}

function SecondaryButtonComponent(model: SecondaryButtonComponentModel): React.JSX.Element {

  const logSource = "SecondaryButtonComponent";

  useEffect(() => {

  }, []);

  return (
      <ButtonComponent {...model}
                       style={{
                         buttonStyle: [model.wrapperStyle],
                         textStyle: SecondaryButtonStyling.textStyle,
                         backgroundStyle: ThemeManager.theme.buttons.secondary.bg,
                         pressedButtonStyle: ThemeManager.theme.buttons.secondary.pressed
                      }}>
      </ButtonComponent>
  );
}

export default SecondaryButtonComponent;
