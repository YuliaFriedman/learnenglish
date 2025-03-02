/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { PrimaryButtonModel } from "./PrimaryButtonModel.ts";
import { PrimaryButtonStyling } from "./PrimaryButton.styling.tsx";
import ButtonComponent from "../../../../core/components/button/button.component";
import { GradientLayout } from "../../../../core/components/gradient-layout/GradientLayout.tsx";
import { ThemeManager } from "../../../style/ThemeManager.ts";

function PrimaryButtonComponent(model: PrimaryButtonModel): React.JSX.Element {

  const logSource = "PrimaryButtonComponent";

  useEffect(() => {

  }, []);

  return (
    <GradientLayout style={PrimaryButtonStyling.buttonWrapperStyle} model={ThemeManager.theme.buttons.primary.bg}>
      <ButtonComponent {...model} style={{ textStyle: PrimaryButtonStyling.textStyle, buttonStyle: PrimaryButtonStyling.buttonStyle }}>
      </ButtonComponent>
    </GradientLayout>
  );
}

export default PrimaryButtonComponent;
