import { Chunk } from "../../story/StoryActivityModel";
import { Text, View } from "react-native";
import { ChunkComponentStyling } from "./ChunkComponent.styling";
import { LanguageManager } from "../../../app-data/language";
import { Dictionary } from "../../../app-data/dictionaries/Dictionary";
import { Logger } from "../../../logger/Logger";

export function ChunkComponent(args: {chunk:Chunk, id: string, language: string, addSpace: boolean,onPress: (id: string) => void}){

  //console.log("IN Chunk: id = " + args.id + ", is selected = " + args.chunk.isSelected);

  function textPressed(){
    if(args.onPress && !args.chunk.isSign){
      Logger.log("ChunkComponent", "Chunk pressed: " + args.id);
      args.onPress(args.id);
    }
  }

  return (
    <View>
      <Text
        style={[
          ChunkComponentStyling.text,
          args.chunk.isSelected ? ChunkComponentStyling.selectedText : undefined,
          LanguageManager.isRtl(args.language)
        ]}
        onPress={textPressed}>{ args.chunk.words.map(word => args.chunk.isSign ? word : Dictionary.translate(word, args.language)).join(" ") + (args.addSpace ? " " : "")}</Text>
    </View>
  );

}
