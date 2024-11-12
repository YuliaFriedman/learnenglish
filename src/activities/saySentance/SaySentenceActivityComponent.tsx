import { ActivityProps } from "../../data-models/LevelStepModel";
import { SaySentenceActivityModel } from "./SaySentenceActivityModel";
import { SentenceBlockComponentStyleType } from "../common/sentence-block/SentenceBlockComponent.styling";
import { SentenceBlockComponent } from "../common/sentence-block/SentenceBlockComponent";
import { Button, TouchableOpacity, View, Text } from "react-native";
import { SaySentenceActivityComponentStyling } from "./SaySentenceActivityComponent.styling";
import { CommonStyle } from "../common/CommonStyle";
import { getTheme } from "../../style/Theme";
import { LevelManager } from "../../services/LevelManager";
import { useEffect, useState } from "react";
import { SpeechToTextManager } from "../../sound/SpeechToTextManager";

export function SaySentenceActivityComponent({model} : ActivityProps<SaySentenceActivityModel>){

  let [isListening, setIsListening] = useState(false);

  useEffect(() => {
    SpeechToTextManager.init(speechStartHandler, speechEndHandler, speechResultsHandler);
    return () => {
      SpeechToTextManager.destroy();
    };
  }, []);

    function goToNextQuestion(){
        LevelManager.loadNextStep();
    }

    function startRecording(){
      SpeechToTextManager.start();
    }

    function speechStartHandler() {
      setIsListening(true);
    }

    function speechEndHandler(){
      setIsListening(false);
    }

    function speechResultsHandler(){

    }

    return (
       <View style={SaySentenceActivityComponentStyling.host}>
           <View style={SaySentenceActivityComponentStyling.sentence}>
               <SentenceBlockComponent
                 model={model.sentence}
                 styleType={SentenceBlockComponentStyleType.Clean}></SentenceBlockComponent>
           </View>
         <TouchableOpacity onPress={startRecording} >
           <Text disabled={isListening} style={{color: 'black', fontWeight: 'bold'}}>{isListening ? "listening..." : "Speak"}</Text>
         </TouchableOpacity>
           <View style={CommonStyle.nextButtonWrapper}>
               <Button title="Next" onPress={goToNextQuestion} color={getTheme().storyLine.nextButtonColor}></Button>
           </View>
       </View>

    );
}
