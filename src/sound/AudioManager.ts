import Tts from 'react-native-tts';
import { Languages } from "../app-data/language";
import { Alert } from 'react-native';

type TtsCompletePromiseType = {
  resolve: ((value: unknown) => void) | null;
  reject: ((reason?: any) => void) | null;
};

export const AudioManager = {

  playWithTts: [Languages.EN],

  ttsCompletePromise: {resolve: null, reject: null} as TtsCompletePromiseType,

  init(){
    Tts.setDefaultRate(0.2);
    Tts.addEventListener('tts-finish', () => AudioManager.ttsFinished());
    // Example usage
    //this.checkLanguageSupport('he-IL'); // Attempt to check Hebrew support


  },

  /*checkLanguageSupport(languageCode){
    Tts.setDefaultLanguage(languageCode)
      .then(() => {
        console.log(`Language set to ${languageCode}`);
        // Proceed with using the language
      })
      .catch((error) => {
        console.error(`Failed to set language to ${languageCode}:`, error);
        // Prompt user to install the language pack
        this.promptUserToInstallLanguagePack(languageCode);
      });
  },

  promptUserToInstallLanguagePack(languageCode){
    Alert.alert(`The language ${languageCode} is not installed on your device. Please install it in your device's settings.`);
    // Optionally, provide more guidance or instructions
  },*/


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
