/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { PrimaryButtonStyling } from "./PrimaryButton.styling.tsx";
import ButtonComponent from "../../../../core/components/button/button.component";
import { GradientLayout } from "../../../../core/components/gradient-layout/GradientLayout.tsx";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { ButtonModel } from "../../../../core/components/button/buttonModel.ts";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native";

export interface PrimaryButtonModel extends ButtonModel{
  wrapperStyle?: StyleProp<ViewStyle>;
}

function PrimaryButtonComponent(model: PrimaryButtonModel): React.JSX.Element {

  const logSource = "PrimaryButtonComponent";

  useEffect(() => {

  }, []);

  return (
    <GradientLayout style={[PrimaryButtonStyling.buttonWrapperStyle,model.wrapperStyle]} model={ThemeManager.theme.buttons.primary.bg}>
      <ButtonComponent {...model} style={{ textStyle: PrimaryButtonStyling.textStyle, buttonStyle: PrimaryButtonStyling.buttonStyle }}>
      </ButtonComponent>
    </GradientLayout>
  );
}

export default PrimaryButtonComponent;
