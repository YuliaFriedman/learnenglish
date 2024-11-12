import { Button, View } from "react-native";
import { StoryLineActivityModel} from "./StoryLineActivityModel";
import { SentenceBlockComponent } from "../common/sentence-block/SentenceBlockComponent";
import { useState } from "react";
import { LevelManager } from "../../services/LevelManager";
import { ActivityProps } from "../../data-models/LevelStepModel";
import { Logger } from "../../logger/Logger";
import { getTheme } from "../../style/Theme";
import { StoryLineActivityComponentStyling } from "./StoryLineActivityComponent.styling";
import { CommonStyle } from "../common/CommonStyle";

// noinspection TypeScriptValidateTypes
export function StoryLineActivity({ model }: ActivityProps<StoryLineActivityModel>) {

  const [currentModel, setCurrentModel] = useState(model);

  function chunkPressed(blockId: string, chunkId: string){
    let typeAndIndex = chunkId.split("_");
    const currentSentenceIndex = blockId.split("_")[1];
    Logger.log("StoryLineActivityComponent", "block index = " + currentSentenceIndex + ", type = " + typeAndIndex[0] + ", index = " + typeAndIndex[1]);

    setCurrentModel({
      ...currentModel,
      line: {
        ...currentModel.line,
        sentence: {
          ...currentModel.line.sentence,
          chunks: currentModel.line.sentence.chunks.map((item, index) => {
            return {...item, isSelected: index == typeAndIndex[1]}
          })
        },
        translation: {
          ...currentModel.line.translation,
          chunks: currentModel.line.translation.chunks.map((item, index) => {
            return {...item, isSelected: index == typeAndIndex[1]}
          })
        }
      }
    });

    Logger.log("StoryLineActivityComponent", "after press", false, currentModel);
  }

  function blockVoiceCompleted(){

  }

  function goToNextPage(){
    Logger.log("StoryLineActivityComponent", "Next button clicked");
    LevelManager.loadNextStep();
  }

  return (
    <View style={StoryLineActivityComponentStyling.host}>
      <SentenceBlockComponent
        model={currentModel.line}
        id={"story_line"}
        onChunkPress={chunkPressed}
        onVoiceCompleted={blockVoiceCompleted}>
      </SentenceBlockComponent>

      <View style={CommonStyle.nextButtonWrapper}>
        <Button title="Next" onPress={goToNextPage} color={getTheme().storyLine.nextButtonColor}></Button>
      </View>
    </View>
  );
 }
