import { en_dictionary } from "./EN";
import { Word } from "./word";
import { Logger } from "../../../../logger/Logger";
import { he_dictionary } from "./HE";

class Dictionary{
  dictionaries: Record<string, Record<string, Word>>;

  constructor(){
    this.dictionaries = {};
    this.dictionaries["en"] = en_dictionary;
    this.dictionaries["he"] = he_dictionary;
  }

  getWord(language: string, word: string){
    if(this.dictionaries[language]) {
      return this.dictionaries[language][word];
    }
  }
}


export const dictionary = new Dictionary();
