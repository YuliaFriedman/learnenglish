import Voice from '@react-native-voice/voice';

export const SpeechToTextManager = {

  onSpeechStart: (e) => {},
  onSpeechEnd: (e) => {},
  onSpeechResults: (e) => {},

  init: (onSpeechStart: () => void, onSpeechEnd: () => void, onSpeechResults: () => void) => {
    SpeechToTextManager.onSpeechStart = onSpeechStart;
    SpeechToTextManager.onSpeechEnd = onSpeechEnd;
    SpeechToTextManager.onSpeechResults = onSpeechResults;
    Voice.onSpeechStart = SpeechToTextManager.onSpeechStartHandler;
    Voice.onSpeechEnd = SpeechToTextManager.onSpeechEndHandler;
    Voice.onSpeechResults = SpeechToTextManager.onSpeechResultsHandler;
  },

  onSpeechStartHandler: (e) => {
    console.log("onSpeechStartHandler", e);
    if(SpeechToTextManager.onSpeechStart){
      SpeechToTextManager.onSpeechStart(e);
    }
  },

  onSpeechEndHandler: (e) => {
    console.log("onSpeechEndHandler", e);
    if(SpeechToTextManager.onSpeechEnd){
      SpeechToTextManager.onSpeechEnd(e);
    }
  },

  onSpeechResultsHandler: (results) => {
    console.log("onSpeechResultsHandler", results);
    if(SpeechToTextManager.onSpeechResults){
      SpeechToTextManager.onSpeechResults(results);
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
    SpeechToTextManager.onSpeechStart = null;
    SpeechToTextManager.onSpeechEnd = null;
    SpeechToTextManager.onSpeechResults = null;
  }
}
