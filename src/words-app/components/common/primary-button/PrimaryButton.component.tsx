/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { PrimaryButtonStyling } from "./PrimaryButton.styling.tsx";
import ButtonComponent from "../../../../core/components/button/Button.component.tsx";
import { ButtonModel } from "../../../../core/components/button/ButtonModel.ts";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native";
import { ThemeManager } from "../../../style/ThemeManager.ts";

export interface PrimaryButtonModel extends ButtonModel{
  wrapperStyle?: StyleProp<ViewStyle>;
}

function PrimaryButtonComponent(model: PrimaryButtonModel): React.JSX.Element {

  const logSource = "PrimaryButtonComponent";

  useEffect(() => {

  }, []);

  return (
      <ButtonComponent {...model}
                       style={{
                         textStyle: PrimaryButtonStyling.textStyle,
                         buttonStyle: [model.wrapperStyle],
                         backgroundStyle: ThemeManager.theme.buttons.primary.bg,
                         pressedButtonStyle: ThemeManager.theme.buttons.primary.pressed
      }}>
      </ButtonComponent>
  );
}

export default PrimaryButtonComponent;
