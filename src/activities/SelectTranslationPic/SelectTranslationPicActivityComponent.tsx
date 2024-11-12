import { ActivityProps } from "../../data-models/LevelStepModel";
import { SelectTranslationPicActivityModel } from "./SelectTranslationPicActivityModel";
import { Button, Pressable, Text, View } from "react-native";
import { Dictionary } from "../../app-data/dictionaries/Dictionary";
import { SelectTranslationPicActivityComponentStyling } from "./SelectTranslationPicActivityComponent.styling";
import { useState } from "react";
import { CommonStyle } from "../common/CommonStyle";
import { getTheme } from "../../style/Theme";
import { LevelManager } from "../../services/LevelManager";
import { SentenceBlockComponent } from "../common/sentence-block/SentenceBlockComponent";
import { SentenceBlockComponentStyleType } from "../common/sentence-block/SentenceBlockComponent.styling";
import { LanguageManager } from "../../app-data/language";
import { SelectAnswerBlockComponent } from "./SelectAnswerBlockComponent";

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
      <View style={style.question}>
        <SentenceBlockComponent
          model={{sentence: {chunks: [{words: [model.word]}], language: LanguageManager.currentLanguage}}}
          styleType={SentenceBlockComponentStyleType.Clean}></SentenceBlockComponent>
      </View>
      <View style={style.answerRow}>
        <View style={style.answer}>
          <SelectAnswerBlockComponent
            onPress={() => answerPressed(0)}
            id={0}
            language={model.answers[0].language}
            word={model.answers[0].word}
            isCorrectAnswer={isSelectedAnswer(0) && !wrongAnswer}
            isSelected={isSelectedAnswer(0)}
          ></SelectAnswerBlockComponent>
        </View>

        <View style={style.answer}>
          <SelectAnswerBlockComponent
            onPress={() => answerPressed(1)}
            id={0}
            language={model.answers[1].language}
            word={model.answers[1].word}
            isCorrectAnswer={isSelectedAnswer(1) && !wrongAnswer}
            isSelected={isSelectedAnswer(1)}
          ></SelectAnswerBlockComponent>
        </View>
      </View>
      <View style={style.answerRow}>
        <View style={style.answer}>
          <SelectAnswerBlockComponent
            onPress={() => answerPressed(2)}
            id={0}
            language={model.answers[2].language}
            word={model.answers[2].word}
            isCorrectAnswer={isSelectedAnswer(2) && !wrongAnswer}
            isSelected={isSelectedAnswer(2)}
          ></SelectAnswerBlockComponent>
        </View>

        <View style={style.answer}>
          <SelectAnswerBlockComponent
            onPress={() => answerPressed(3)}
            id={0}
            language={model.answers[3].language}
            word={model.answers[3].word}
            isCorrectAnswer={isSelectedAnswer(3) && !wrongAnswer}
            isSelected={isSelectedAnswer(3)}
          ></SelectAnswerBlockComponent>
        </View>
      </View>
      <View style={CommonStyle.nextButtonWrapper}>
        <Button title="Next" onPress={checkAnswer} color={getTheme().storyLine.nextButtonColor}></Button>
      </View>
    </View>
  )

}
