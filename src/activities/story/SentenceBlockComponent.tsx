import { Chunk, SentenceBlock } from "./StoryActivityModel";
import { View, Text } from "react-native";
import { ChunkComponent } from "./ChunkComponent";
import { SentenceBlockComponentStyle } from "./SentenceBlockComponent.styling";
import { LanguageManager } from "../../app-data/language";
import { useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getTheme } from "../../style/Theme";
import { AudioManager } from "../../sound/AudioManager";

const theme = getTheme();

export function SentenceBlockComponent(
  args: {
    model: SentenceBlock,
    id: string,
    onChunkPress: (blockId: string, chunkId: string) => void,
    onVoiceCompleted: (blockId: string) => void
  }
){

  useEffect(() => {
    playSoundClicked(args.model.sentence, LanguageManager.currentLanguage, true);
  });

  function chunkPressed(id:string){
    if(args.onChunkPress){
      args.onChunkPress(args.id, id);
    }
  }

  let sentence = args.model.sentence.map((chunk, index) => {
    return <ChunkComponent
      key={"sentence_chunk_" + index}
      chunk={chunk}
      id={"sentence_" + index}
      language={LanguageManager.currentLanguage}
      onPress={(id) => chunkPressed(id)}
      addSpace={addSpaceToChunk(index, args.model.sentence)}/>
  });
  if(LanguageManager.isRtl(LanguageManager.currentLanguage)){
    sentence = sentence.reverse();
  }


  let translation = args.model.translation.map((chunk, index) => {
    return <ChunkComponent
      key={"translation_chunk_" + index}
      chunk={chunk}
      id={"translation_" + index}
      language={LanguageManager.currentTranslation}
      onPress={(id) => chunkPressed(id)}
      addSpace={addSpaceToChunk(index, args.model.sentence)}/>
  });
  if(LanguageManager.isRtl(LanguageManager.currentTranslation)){
    translation = translation.reverse();
  }

  function addSpaceToChunk(index: number, sentence:Chunk[]){
    const isLast = index == sentence.length - 1;
    const nextIsSign = isLast ? false : sentence[index + 1].isSign;
    return !isLast && !nextIsSign;
  }

  function playSoundClicked(sentence: Chunk[], language: string, triggerCompleteEvent: boolean = false){
    const promise = AudioManager.playSound(args.model.sound, sentence.map(item => item.words.join(" ")).join(" "), language);
      if(triggerCompleteEvent) {
        console.log("In playSoundClicked: trigger event");
        promise.then(() => {
          console.log("In playSoundClicked: play souned finished");
          if (args.onVoiceCompleted) {
            args.onVoiceCompleted(args.id);
          }
        });
      }
  }

  return (
    <View style={SentenceBlockComponentStyle.host}>
      <View style={SentenceBlockComponentStyle.container}>
        <Text style={SentenceBlockComponentStyle.volumeIcon} onPress={() => {playSoundClicked(args.model.sentence, LanguageManager.currentLanguage)}}>
          <Icon
            name="volume-up"
            size={theme.sentenceBlock.voiceIconSize}
            color={theme.sentenceBlock.voiceIconColor} />
        </Text>
        {sentence}
      </View>
      <View style={SentenceBlockComponentStyle.container}>
        <Text style={SentenceBlockComponentStyle.volumeIcon}>
          <Icon
            name="volume-up"
            size={theme.sentenceBlock.voiceIconSize}
            color={theme.sentenceBlock.voiceIconColor}
            onPress={() => {playSoundClicked(args.model.translation, LanguageManager.currentTranslation)}}/></Text>
        {translation}
      </View>
    </View>

  );

}

