/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { CancelButtonModel } from "./CancelButtonModel";
import { CancelButtonStyling } from "./CancelButton.styling";
import ButtonComponent from "../../common-components/button/button.component";
//import { ButtonComponent } from "../../common-components/button/button.component";

function CancelButtonComponent(model: CancelButtonModel): React.JSX.Element {

  const logSource = "NextButtonComponent";

  useEffect(() => {

  }, []);

  return (
    <ButtonComponent {...model} style={{buttonStyle: CancelButtonStyling.nextButton, textStyle: CancelButtonStyling.textStyle }}>
    </ButtonComponent>
  );
}

export default CancelButtonComponent;
