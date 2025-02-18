import Voice from '@react-native-voice/voice';
import {
  SpeechEndEvent,
  SpeechResultsEvent,
  SpeechStartEvent
} from "@react-native-voice/voice/src/VoiceModuleTypes.ts";

export interface SpeechResults {
  values?: string[]
}

export const SpeechToTextManager = {

  onSpeechStart: (e:SpeechStartEvent) => {} ,
  onSpeechEnd: (e:SpeechEndEvent) => {},
  onSpeechResults: (e:SpeechResults) => {},

  init: (onSpeechStart: () => void, onSpeechEnd: () => void, onSpeechResults: (results:SpeechResults) => void) => {
    SpeechToTextManager.onSpeechStart = onSpeechStart;
    SpeechToTextManager.onSpeechEnd = onSpeechEnd;
    SpeechToTextManager.onSpeechResults = onSpeechResults;
    Voice.onSpeechStart = SpeechToTextManager.onSpeechStartHandler;
    Voice.onSpeechEnd = SpeechToTextManager.onSpeechEndHandler;
    Voice.onSpeechResults = SpeechToTextManager.onSpeechResultsHandler;
  },

  onSpeechStartHandler: (e:SpeechStartEvent) => {
    if(e?.error) {
      console.log("onSpeechStartHandler", e);
    }
    if(SpeechToTextManager.onSpeechStart){
      SpeechToTextManager.onSpeechStart(e);
    }
  },

  onSpeechEndHandler: (e:SpeechEndEvent) => {
    if(e?.error) {
      console.log("onSpeechEndHandler", e);
    }
    if(SpeechToTextManager.onSpeechEnd){
      SpeechToTextManager.onSpeechEnd(e);
    }
  },

  onSpeechResultsHandler: (results:SpeechResultsEvent) => {
    console.log("onSpeechResultsHandler", results);
    if(SpeechToTextManager.onSpeechResults){
      SpeechToTextManager.onSpeechResults({values: results.value});
    }
  },

  start: () => {
    Voice.start('en-US').then(
      () => {
        console.log("voice started successfully");
      },
      (error) => {
        console.log("error on start voice");
      });
  },

  destroy: () => {
    Voice.destroy().then(Voice.removeAllListeners);
    SpeechToTextManager.onSpeechStart = () => {};
    SpeechToTextManager.onSpeechEnd = () => {};
    SpeechToTextManager.onSpeechResults = () => {};
  }
}
