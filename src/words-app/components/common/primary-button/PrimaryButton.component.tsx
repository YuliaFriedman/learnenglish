/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { PrimaryButtonModel } from "./PrimaryButtonModel.ts";
import { PrimaryButtonStyling } from "./PrimaryButton.styling.tsx";
import ButtonComponent from "../../../common-components/button/button.component";

function PrimaryButtonComponent(model: PrimaryButtonModel): React.JSX.Element {

  const logSource = "PrimaryButtonComponent";

  useEffect(() => {

  }, []);

  return (
    <ButtonComponent {...model} style={{buttonStyle: PrimaryButtonStyling.nextButton, textStyle: PrimaryButtonStyling.textStyle }}>
    </ButtonComponent>
  );
}

export default PrimaryButtonComponent;
