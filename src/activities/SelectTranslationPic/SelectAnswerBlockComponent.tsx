import { Pressable, Text, View } from "react-native";
import { Dictionary } from "../../app-data/dictionaries/Dictionary";
import { SelectAnswerBlockStyling } from "./SelectAnswerBlockComponent.styling";
import { SelectAnswerBlockModel } from "./SelectAnswerBlockModel";
import { AudioManager } from "../../sound/AudioManager";
import FastImage from "react-native-fast-image";

export function SelectAnswerBlockComponent(model:SelectAnswerBlockModel){
  function playSound() {
    // AudioManager.playSound({
    //   soundKey: "",
    //   text: model.word,
    //   language: model.language
    // });
  }



  return (
      <Pressable style={[SelectAnswerBlockStyling.host, !model.isCorrectAnswer && model.isSelected && SelectAnswerBlockStyling.wrongAnswer, model.isCorrectAnswer && model.isSelected && SelectAnswerBlockStyling.selectedAnswer]}
                 onPress={() => model.onPress()}>
        <Text style={SelectAnswerBlockStyling.text}>{Dictionary.translate(model.word,model.language)}</Text>

        <FastImage
          style={SelectAnswerBlockStyling.image}
          source={require('./../../../assets/images/ball.webp')}  // Local .webp image
          resizeMode={FastImage.resizeMode.contain}
        />

      </Pressable>

  )
}
