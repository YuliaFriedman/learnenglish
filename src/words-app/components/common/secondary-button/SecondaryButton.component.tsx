/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { SecondaryButtonStyling } from "./SecondaryButton.styling.tsx";
import ButtonComponent from "../../../../core/components/button/button.component";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { GradientLayout } from "../../../../core/components/gradient-layout/GradientLayout.tsx";
import { ButtonModel } from "../../../../core/components/button/buttonModel.ts";
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
    <GradientLayout style={[SecondaryButtonStyling.buttonWrapperStyle, model.wrapperStyle]} model={ThemeManager.theme.buttons.secondary.bg}>
      <ButtonComponent {...model} style={{buttonStyle: SecondaryButtonStyling.nextButton, textStyle: SecondaryButtonStyling.textStyle }}>
      </ButtonComponent>
    </GradientLayout>
  );
}

export default SecondaryButtonComponent;
