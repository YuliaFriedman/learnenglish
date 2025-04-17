import { View } from "react-native";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import { ThemeManager } from "../../../style/ThemeManager.ts";
import { CategoryCompletedStyling } from "../category-completed/CategoryCompleted.styling.tsx";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import { fromPercentToPixelsWidth } from "../../../../style/dimentions.ts";
import PrimaryButtonComponent from "../../common/primary-button/PrimaryButton.component.tsx";
import { useServices } from "../../../dependency-injection/ServicesContext.tsx";


export function GroupCompleted() {

  const { navigationManager } = useServices();

  function goToNextGame(){
    navigationManager.goToNextStep();
  }

  return (
    <View>
      <StrokeText
        text="Group Completed"
        fontSize={30}
        color={ThemeManager.theme.games.gamesGroupCompleted.titleColor}
        strokeColor={ThemeManager.theme.games.gamesGroupCompleted.titleStrokeColor}
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
      <PrimaryButtonComponent wrapperStyle={CategoryCompletedStyling.button} onPress={goToNextGame}>Done</PrimaryButtonComponent>
    </View>
  )
}
