import { Text, View } from "react-native";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { CategoryCompletedStyling } from "./CategoryCompleted.styling.tsx";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { useRef } from "react";
import { DepInjectionsTokens } from "../../../dependency-injection/DepInjectionTokens.ts";
import InjectionManager from "../../../../core/services/InjectionManager.ts";
import { INavigationManager } from "../../../navigation/INavigationManager.tsx";
import { fromPercentToPixelsWidth } from "../../../../style/dimentions.ts";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";

export function CategoryCompleted() {

  const navigationManager = useRef<INavigationManager>( InjectionManager.useInjection<INavigationManager>(DepInjectionsTokens.NAVIGATION_MANAGER) );

  function navigateToHome() {
    navigationManager.current.navigateHome();
  }

  return(
      <View style={CategoryCompletedStyling.host}>
        <StrokeText
          text="Category Completed"
          fontSize={30}
          color={ThemeManager.theme.gameCompleted.titleColor}
          strokeColor={ThemeManager.theme.gameCompleted.titleStrokeColor}
          strokeWidth={5}
          fontFamily="Nunito-Black"
        />
        <View style={CategoryCompletedStyling.imgContainer}>
        <Icon
          style={CategoryCompletedStyling.img}
          name="trophy"
          size={fromPercentToPixelsWidth(50)}
          color={ThemeManager.theme.gameCompleted.iconColor} />
        </View>
        <PrimaryButtonComponent wrapperStyle={CategoryCompletedStyling.button} onPress={navigateToHome}>Done</PrimaryButtonComponent>
      </View>
    )
}
