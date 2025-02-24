import Tts from 'react-native-tts';
import { Languages } from "../app-data/language";
import { Alert } from 'react-native';
import { Logger } from "../logger/Logger";
import { IAudioManager, SoundInfoToPlay, TtsCompletePromiseType } from "./IAudioManager.ts";

export class AudioManager implements IAudioManager {

  logSource = "AudioManager";

  playWithTts = [Languages.EN];

  ttsCompletePromise = {resolve: null, reject: null} as TtsCompletePromiseType;
  playList = undefined as SoundInfoToPlay[] | undefined;
  currentPlayIndex = -1;

  constructor(){
    Tts.removeAllListeners('tts-finish');
    Tts.setDefaultRate(0.2);
    Tts.addEventListener('tts-finish', () => this.ttsFinished());
    // Example usage
    //this.checkLanguageSupport('he-IL'); // Attempt to check Hebrew support


  }

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
    Logger.log(this.logSource, "ttsFinished");
    if(this.hasMoreSoundsToPlay()){
      this.playNextSound();
    }
    else{
      if(this.ttsCompletePromise && this.ttsCompletePromise.resolve){
        this.ttsCompletePromise.resolve();
      }
      this.resetData();
    }

  }

  resetData(){
    this.ttsCompletePromise.resolve = null;
    this.ttsCompletePromise.reject = null;
    this.currentPlayIndex = -1;
    this.playList = undefined;

  }

  playSound(soundInfo: SoundInfoToPlay, savePromise:boolean = true):Promise<void>{
    return new Promise<void>((resolve, reject) => {
      if(this.playWithTts.indexOf(soundInfo.language) >= 0){
        if(savePromise) {
          this.ttsCompletePromise.reject = reject;
          this.ttsCompletePromise.resolve = resolve;
        }
        Tts.speak(soundInfo.text);
      }
      else{

      }
    });
  }

  PlaySoundGroup(soundInfo: SoundInfoToPlay[]){
    if(soundInfo && soundInfo.length > 0){
      this.playList = soundInfo;
      return this.playNextSound();
    }
    else{
      return Promise.resolve();
    }
  }

  playNextSound(){
    Logger.log(this.logSource, "playNextSound");
    if(this.hasMoreSoundsToPlay()) {
      this.currentPlayIndex++;
      const nextSound = this.playList ? this.playList[this.currentPlayIndex]:undefined;
      if(nextSound) {
        return this.playSound(nextSound, this.currentPlayIndex === 0);
      }
      else{
        return Promise.resolve();
      }
    }
    else{
      return Promise.resolve();
    }
  }

  hasMoreSoundsToPlay(){
    return this.playList && this.currentPlayIndex < this.playList.length - 1;
  }
}
