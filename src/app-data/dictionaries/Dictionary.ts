import { Dictionary_en } from "./Dictionary_en";
import { Dictionary_he } from "./Dictionary_he";

export const Dictionary = {
  en: Dictionary_en,
  he: Dictionary_he,

  translate(key, dictionary){
    return this[dictionary] && this[dictionary][key] ? this[dictionary][key] : key;
  }
}
