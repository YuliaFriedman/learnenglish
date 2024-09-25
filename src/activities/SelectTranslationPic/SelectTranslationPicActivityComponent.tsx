import { ActivityProps } from "../../data-models/LevelStepModel";
import { SelectTranslationPicActivityModel } from "./SelectTranslationPicActivityModel";
import { View, Text, Pressable, Button } from "react-native";
import { Dictionary } from "../../app-data/dictionaries/Dictionary";
import { SelectTranslationPicActivityComponentStyling } from "./SelectTranslationPicActivityComponent.styling";
import { useState } from "react";
import { CommonStyle } from "../common/CommonStyle";
import { getTheme } from "../../style/Theme";
import { LevelManager } from "../../services/LevelManager";

export function SelectTranslationPicActivity({model} : ActivityProps<SelectTranslationPicActivityModel>){

  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const style = SelectTranslationPicActivityComponentStyling;

  function checkAnswer(){
    if(selectedAnswer === model.correctAnswer){
      LevelManager.loadNextStep();
    }
    else{
      setWrongAnswer(true);
    }
  }

  function answerPressed(answer:number){
    if(selectedAnswer != answer){
      setWrongAnswer(false);
      setSelectedAnswer(answer);
    }
  }

  function isSelectedAnswer(answer:number){
    return selectedAnswer === answer;
  }

  return (
    <View style={style.host}>
      <View style={style.question}><Text style={style.text}>{model.word}</Text></View>
      <View style={style.answerRow}>
        <Pressable style={[style.answer, wrongAnswer && isSelectedAnswer(0) && style.wrongAnswer, !wrongAnswer && isSelectedAnswer(0) && style.selectedAnswer]}
                   onPress={() => answerPressed(0)}>
          <Text style={style.text}>{Dictionary.translate(model.answers[0].word,model.answers[0].language)}</Text>
        </Pressable>
        <Pressable style={[style.answer, wrongAnswer && isSelectedAnswer(1) && style.wrongAnswer, !wrongAnswer && isSelectedAnswer(1) && style.selectedAnswer]}
                   onPress={() => answerPressed(1)}>
          <Text style={style.text}>{Dictionary.translate(model.answers[1].word,model.answers[1].language)}</Text>
        </Pressable>
      </View>
      <View style={style.answerRow}>
        <Pressable style={[style.answer, wrongAnswer && isSelectedAnswer(2) && style.wrongAnswer, !wrongAnswer && isSelectedAnswer(2) && style.selectedAnswer]}
                   onPress={() => answerPressed(2)}>
          <Text style={style.text}>{Dictionary.translate(model.answers[2].word,model.answers[2].language)}</Text>
        </Pressable>
        <Pressable style={[style.answer, wrongAnswer && isSelectedAnswer(3) && style.wrongAnswer, !wrongAnswer && isSelectedAnswer(3) && style.selectedAnswer]}
                   onPress={() => answerPressed(3)}>
          <Text style={style.text}>{Dictionary.translate(model.answers[3].word,model.answers[3].language)}</Text>
        </Pressable>
      </View>
      <View style={CommonStyle.nextButtonWrapper}>
        <Button title="Next" onPress={checkAnswer} color={getTheme().storyLine.nextButtonColor}></Button>
      </View>
    </View>
  )

}
