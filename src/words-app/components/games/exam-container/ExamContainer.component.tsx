import { View } from "react-native";
import { GameContainerStyling } from "../game-container/GameContainer.styling.tsx";
import React from "react";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";

export function ExamContainerComponent(){

  const { navigationManager } = useServices();

  function examCompleted(){
    navigationManager.goToNextStep();
  }

  return (
    <View style={GameContainerStyling.host}>
      {/*{game}*/}
      <PrimaryButtonComponent onPress={examCompleted}>Finish</PrimaryButtonComponent>
    </View>
  )
}
