/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { SecondaryButtonModel } from "./SecondaryButtonModel.ts";
import { SecondaryButtonStyling } from "./SecondaryButton.styling.tsx";
import ButtonComponent from "../../../../core/components/button/button.component";

function SecondaryButtonComponent(model: SecondaryButtonModel): React.JSX.Element {

  const logSource = "NextButtonComponent";

  useEffect(() => {

  }, []);

  return (
    <ButtonComponent {...model} style={{buttonStyle: SecondaryButtonStyling.nextButton, textStyle: SecondaryButtonStyling.textStyle }}>
    </ButtonComponent>
  );
}

export default SecondaryButtonComponent;
