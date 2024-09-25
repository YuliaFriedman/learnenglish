import { View } from "react-native";
import { StoryActivityModel } from "./StoryActivityModel";
import { SentenceBlockComponent } from "../common/sentence-block/SentenceBlockComponent";
import { StoryActivityComponentStyling } from "./StoryActivityComponent.styling";
import { useEffect, useState } from "react";
import { ViewProducer } from "../../store/viewProducer";
import { ActivityProps } from "../../data-models/LevelStepModel";
import { Logger } from "../../logger/Logger";

// noinspection TypeScriptValidateTypes
export function StoryActivity({ model }: ActivityProps<StoryActivityModel>) {

  const [currentModel, setCurrentModel] = useState(model);
  const [blocks, setBlocks] = useState([]);
  const [numOfBlocks, setNumOfBlocks] = useState(1);

  useEffect(() => {
    setBlocks(model.sentences.slice(0, numOfBlocks).map((sentenceBlock, index) =>
      <SentenceBlockComponent
        key={"sentenceblock_" + index}
        model={sentenceBlock}
        id={"sentenceblock_" + index}
        onChunkPress={chunkPressed}
        onVoiceCompleted={blockVoiceCompleted}>
      </SentenceBlockComponent>));


    function chunkPressed(blockId: string, chunkId: string){
      let typeAndIndex = chunkId.split("_");
      const currentSentenceIndex = blockId.split("_")[1];
      Logger.log("StoryActivity", "block index = " + currentSentenceIndex + ", type = " + typeAndIndex[0] + ", index = " + typeAndIndex[1]);
      setCurrentModel((currentModel) => {
        return {
          ...currentModel,
          sentences: currentModel.sentences.map((sentence, sentenceIndex) => {
            return {
              ...sentence,
              sentence: sentence.sentence.map((item, index) => {
                return { ...item, isSelected: currentSentenceIndex == sentenceIndex && index == typeAndIndex[1] }
              }),
              translation: sentence.translation.map((item, index) => {
                return { ...item, isSelected: currentSentenceIndex == sentenceIndex && index == typeAndIndex[1] }
              })
            }
          })
        }
      });
      Logger.log("StoryActivity", "after press", false, currentModel);
    }

    function blockVoiceCompleted(){
      Logger.log("StoryActivity", "Voice completed in " + numOfBlocks);
      if(numOfBlocks < currentModel.sentences.length){
        setTimeout(() => {
          setNumOfBlocks((currentNum) => currentNum + 1);
        }, 1000);
      }
    }
  }, [currentModel, numOfBlocks, currentModel.sentences.length]);

  useEffect(() => {
    setTimeout(() =>{
      ViewProducer.scrollToEnd();
    },1000);
    // eslint-disable-next-line
  },[numOfBlocks])

  return (
    <View  style={StoryActivityComponentStyling.host}>
      {blocks}
    </View>
  );
}
