import { View, Text } from "react-native";
import { ChunkComponent } from "./ChunkComponent";
import {
  getSentenceBlockComponentStyle,
  SentenceBlockComponentStyleType
} from "./SentenceBlockComponent.styling";
import { LanguageManager, Languages } from "../../../app-data/language";
import { useEffect } from "react";
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import { getTheme } from "../../../style/Theme";
import { AudioManager } from "../../../sound/AudioManager";
import { Logger } from "../../../logger/Logger";
import { SentenceBlock } from "./SentenceBlockComponentModel";
import { Chunk } from "../../common-models/ChunkModel";

const theme = getTheme();

export function SentenceBlockComponent(
  args: {
    model: SentenceBlock,
    id: string,
    onChunkPress: (blockId: string, chunkId: string) => void,
    onVoiceCompleted: (blockId: string) => void,
    styleType: SentenceBlockComponentStyleType
  }
){

  const style = getSentenceBlockComponentStyle(args.styleType);

  useEffect(() => {
    playSound(args.model.sentence.chunks, args.model.sentence.language, true);
    // eslint-disable-next-line
  }, []);

  function chunkPressed(id:string){
    if(args.onChunkPress){
      args.onChunkPress(args.id, id);
    }
  }

  let sentence = args.model.sentence.chunks.map((chunk, index) => {
    return <ChunkComponent
      key={"sentence_chunk_" + index}
      chunk={chunk}
      id={"sentence_" + index}
      language={args.model.sentence.language}
      onPress={(id) => chunkPressed(id)}
      addSpace={addSpaceToChunk(index, args.model.sentence.chunks)} />
  });

  let translation = null;
  if(args.model.translation) {
    translation = args.model.translation.chunks.map((chunk, index) => {
      return <ChunkComponent
        key={"translation_chunk_" + index}
        chunk={chunk}
        id={"translation_" + index}
        language={args.model.translation.language}
        onPress={(id) => chunkPressed(id)}
        addSpace={addSpaceToChunk(index, args.model.sentence.chunks)} />
    });
  }

  const isTranslationRtl = args.model.translation ? LanguageManager.isRtl(args.model.translation.language) : false;
  const isSentenceRtl = LanguageManager.isRtl(args.model.sentence.language);

  function addSpaceToChunk(index: number, sentence:Chunk[]){
    const isLast = index == sentence.length - 1;
    const nextIsSign = isLast ? false : sentence[index + 1].isSign;
    return !isLast && !nextIsSign;
  }

  function playSound(sentence: Chunk[], language: Languages, triggerCompleteEvent: boolean = false){
    //const promise = AudioManager.playSound({soundKey: args.model.sound, text: sentence.map(item => item.words.join(" ")).join(" "), language});
    //   if(triggerCompleteEvent) {
    //     Logger.log("SentenceComponent", "In playSound: trigger event");
    //     promise.then(() => {
    //       Logger.log("SentenceComponent", "In playSound: play sound finished");
    //       if (args.onVoiceCompleted) {
    //         args.onVoiceCompleted(args.id);
    //       }
    //     });
    //   }
  }

  return (
    <View style={style.host}>
      <View style={[style.container, isSentenceRtl && style.rtlContainer]}>

        <Text style={style.volumeIcon} onPress={() => {playSound(args.model.sentence.chunks, args.model.sentence.language)}}>
          <Icon
            name="volume-up"
            size={theme.sentenceBlock.voiceIconSize}
            color={theme.sentenceBlock.voiceIconColor} />
        </Text>
        {sentence}
      </View>
      { translation ?
        <View style={[style.container, isTranslationRtl && style.rtlContainer]}>
          <Text style={style.volumeIcon}>
            <Icon
              name="volume-up"
              size={theme.sentenceBlock.voiceIconSize}
              color={theme.sentenceBlock.voiceIconColor}
              onPress={() => {playSound(args.model.translation.chunks, args.model.translation.language)}} />
          </Text>
          {translation}
        </View>
        : <></>
      }

    </View>

  );

}

