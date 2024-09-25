import { LevelWord } from "./Interfactes/LevelWord";

export const LevelsHelper = {
  getLevelWord: (word: string, translation: string):LevelWord => {
    return {
      word:word,
      translation: translation
    }
  }
}
