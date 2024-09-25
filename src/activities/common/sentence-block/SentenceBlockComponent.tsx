import { Chunk, SentenceBlock } from "../../story/StoryActivityModel";
import { View, Text } from "react-native";
import { ChunkComponent } from "./ChunkComponent";
import { SentenceBlockComponentStyle } from "./SentenceBlockComponent.styling";
import { LanguageManager } from "../../../app-data/language";
import { useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { getTheme } from "../../../style/Theme";
import { AudioManager } from "../../../sound/AudioManager";
import { Logger } from "../../../logger/Logger";

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
    playSound(args.model.sentence, LanguageManager.currentLanguage, true);
    // eslint-disable-next-line
  }, []);

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
    //translation = translation.reverse();
  }

  const isTranslationRtl = LanguageManager.isRtl(LanguageManager.currentTranslation);
  const isSentenceRtl = LanguageManager.isRtl(LanguageManager.currentLanguage);

  function addSpaceToChunk(index: number, sentence:Chunk[]){
    const isLast = index == sentence.length - 1;
    const nextIsSign = isLast ? false : sentence[index + 1].isSign;
    return !isLast && !nextIsSign;
  }

  function playSound(sentence: Chunk[], language: string, triggerCompleteEvent: boolean = false){
    const promise = AudioManager.playSound(args.model.sound, sentence.map(item => item.words.join(" ")).join(" "), language);
      if(triggerCompleteEvent) {
        Logger.log("SentenceComponent", "In playSound: trigger event");
        promise.then(() => {
          Logger.log("SentenceComponent", "In playSound: play sound finished");
          if (args.onVoiceCompleted) {
            args.onVoiceCompleted(args.id);
          }
        });
      }
  }

  return (
    <View style={SentenceBlockComponentStyle.host}>

      <View style={[SentenceBlockComponentStyle.container, isSentenceRtl && SentenceBlockComponentStyle.rtlContainer]}>
        <Icon
          name="volume-up"
          size={theme.sentenceBlock.voiceIconSize}
          color={theme.sentenceBlock.voiceIconColor} />
        <Text style={SentenceBlockComponentStyle.volumeIcon} onPress={() => {playSound(args.model.sentence, LanguageManager.currentLanguage)}}>
        </Text>
        {sentence}
      </View>
      <View style={[SentenceBlockComponentStyle.container, isTranslationRtl && SentenceBlockComponentStyle.rtlContainer]}>
        <Icon
          name="volume-up"
          size={theme.sentenceBlock.voiceIconSize}
          color={theme.sentenceBlock.voiceIconColor}
          onPress={() => {playSound(args.model.translation, LanguageManager.currentTranslation)}} />
        <Text style={SentenceBlockComponentStyle.volumeIcon}>
          </Text>
        {translation}
      </View>
    </View>

  );

}

