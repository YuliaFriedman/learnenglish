import { View } from "react-native";
import { StoryActivityModel } from "./StoryActivityModel";
import { SentenceBlockComponent } from "./SentenceBlockComponent";
import { StoryActivityComponentStyling } from "./StoryActivityComponent.styling";
import { useEffect, useState } from "react";

export function StoryActivity(args: {model: StoryActivityModel}) {

  const [model, setModel] = useState(args.model);
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
      console.log("IN story activity press: block index = " + currentSentenceIndex + ", type = " + typeAndIndex[0] + ", index = " + typeAndIndex[1]);
      setModel({
        ...model,
        sentences: model.sentences.map((sentence, sentenceIndex) => {
          return {
            ...sentence,
            sentence: sentence.sentence.map((item, index) => {
              return {...item, isSelected: currentSentenceIndex == sentenceIndex && index == typeAndIndex[1]}
            }),
            translation: sentence.translation.map((item, index) => {
              return {...item, isSelected: currentSentenceIndex == sentenceIndex && index == typeAndIndex[1]}
            })
          }
        })
      });
      console.log("IN story activity press: after press", model);
    }

    function blockVoiceCompleted(){
      if(numOfBlocks < args.model.sentences.length){
        setTimeout(() => {
          setNumOfBlocks((currentNum) => currentNum + 1);
        }, 5000);
      }
    }
  }, [model, numOfBlocks, args.model.sentences.length]);


  return (
    <View style={StoryActivityComponentStyling.host}>
      {blocks}
    </View>
  );
}
