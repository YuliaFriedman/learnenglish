import Tts from 'react-native-tts';
import { Languages } from "../app-data/language";

type TtsCompletePromiseType = {
  resolve: ((value: unknown) => void) | null;
  reject: ((reason?: any) => void) | null;
};

export const AudioManager = {

  playWithTts: [Languages.EN],

  ttsCompletePromise: {resolve: null, reject: null} as TtsCompletePromiseType,

  init(){
    Tts.addEventListener('tts-finish', () => AudioManager.ttsFinished());
  },

  ttsFinished(){
    if(AudioManager.ttsCompletePromise && AudioManager.ttsCompletePromise.resolve){
      AudioManager.ttsCompletePromise.resolve(null);
    }
  },

  playSound: (soundKey: string | undefined, text:string, language: string) => {
    return new Promise((resolve, reject) => {
      if(AudioManager.playWithTts.indexOf(language) >= 0){
        AudioManager.ttsCompletePromise.reject = reject;
        AudioManager.ttsCompletePromise.resolve = resolve;
        Tts.speak(text);
      }
      else{

      }
    });
  }
}
