import { View } from "react-native";
import { GameContainerStyling } from "../game-container/GameContainer.styling.tsx";
import React, { useRef } from "react";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { INavigationManager } from "../../../navigation/INavigationManager.tsx";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";

export function ExamContainerComponent(){

  const navigationManager = useRef<INavigationManager>(InjectionManager.useInjection<INavigationManager>(DepInjectionsTokens.NAVIGATION_MANAGER));

  function examCompleted(){
    navigationManager.current.goToNextStep();
  }

  return (
    <View style={GameContainerStyling.host}>
      {/*{game}*/}
      <PrimaryButtonComponent onPress={examCompleted}>Finish</PrimaryButtonComponent>
    </View>
  )
}
