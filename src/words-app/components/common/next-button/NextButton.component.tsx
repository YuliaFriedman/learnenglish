/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { NextButtonModel } from "./NextButtonModel";
import { NextButtonStyling } from "./NextButton.styling";
import { View } from "react-native";
import ButtonComponent from "../../../common-components/button/button.component";
//import { ButtonComponent } from "../../common-components/button/button.component";

function NextButtonComponent(model: NextButtonModel): React.JSX.Element {

  const logSource = "NextButtonComponent";

  useEffect(() => {

  }, []);

  return (
    <ButtonComponent {...model} style={{buttonStyle: NextButtonStyling.nextButton, textStyle: NextButtonStyling.textStyle }}>
    </ButtonComponent>
  );
}

export default NextButtonComponent;
