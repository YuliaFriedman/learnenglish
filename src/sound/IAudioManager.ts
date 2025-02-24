import { Languages } from "../app-data/language.ts";
import Tts from "react-native-tts";
import { Logger } from "../logger/Logger.ts";

export type TtsCompletePromiseType = {
  resolve: (() => void) | null;
  reject: ((reason?: any) => void) | null;
};

export interface SoundInfoToPlay{
  soundKey: string | undefined;
  text:string;
  language: Languages;
}

export interface IAudioManager {
  playSound: (soundInfo: SoundInfoToPlay, savePromise?:boolean) => Promise<void>;
}
