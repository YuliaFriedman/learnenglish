import Tts from 'react-native-tts';
import { Languages } from "../app-data/language";
import { Alert } from 'react-native';

type TtsCompletePromiseType = {
  resolve: ((value: unknown) => void) | null;
  reject: ((reason?: any) => void) | null;
};

export interface SoundInfoToPlay{
  soundKey: string | undefined;
  text:string;
  language: string;
}

export const AudioManager = {

  playWithTts: [Languages.EN],

  ttsCompletePromise: {resolve: null, reject: null} as TtsCompletePromiseType,
  playList: undefined as SoundInfoToPlay[] | undefined,
  currentPlayIndex: -1,

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
    // has more to play
    if(AudioManager.hasMoreSoundsToPlay()){
      AudioManager.playNextSound();
    }
    else{
      AudioManager.resetData();
      if(AudioManager.ttsCompletePromise && AudioManager.ttsCompletePromise.resolve){
        AudioManager.ttsCompletePromise.resolve(null);
      }
    }

  },

  resetData(){
    AudioManager.ttsCompletePromise.resolve = null;
    AudioManager.ttsCompletePromise.reject = null;
    AudioManager.currentPlayIndex = -1;
    AudioManager.playList = undefined;

  },

  playSound: (soundInfo: SoundInfoToPlay, savePromise:boolean = true) => {
    return new Promise((resolve, reject) => {
      if(AudioManager.playWithTts.indexOf(soundInfo.language) >= 0){
        if(savePromise) {
          AudioManager.ttsCompletePromise.reject = reject;
          AudioManager.ttsCompletePromise.resolve = resolve;
        }
        Tts.speak(soundInfo.text);
      }
      else{

      }
    });
  },

  PlaySoundGroup: (soundInfo: SoundInfoToPlay[]) => {
    if(soundInfo && soundInfo.length > 0){
      AudioManager.playList = soundInfo;
      return AudioManager.playNextSound();
    }
    else{
      return Promise.resolve();
    }
  },

  playNextSound(){
    if(AudioManager.hasMoreSoundsToPlay()) {
      AudioManager.currentPlayIndex++;
      const nextSound = AudioManager.playList ? AudioManager.playList[AudioManager.currentPlayIndex]:undefined;
      if(nextSound) {
        return AudioManager.playSound(nextSound, AudioManager.currentPlayIndex === 0);
      }
      else{
        return Promise.resolve();
      }
    }
    else{
      return Promise.resolve();
    }
  },

  hasMoreSoundsToPlay(){
    return AudioManager.playList && AudioManager.currentPlayIndex < AudioManager.playList.length - 1;
  }
}
