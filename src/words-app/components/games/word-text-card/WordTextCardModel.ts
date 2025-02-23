import { PartialWithRequiredProp } from "../../../../utils/Common-Types.ts";
import { Languages } from "../../../../app-data/language.ts";

export class WordTextCardModel {
  id: string = "";
  word: string = "";
  sound: string = "";
  shouldSayTheWord?: boolean = false;
  pressable?: boolean = true;
  language: Languages = Languages.EN;
  translation?: Languages;
  showMic?: boolean = true;

  constructor(args: PartialWithRequiredProp<WordTextCardModel, 'id'> ) {
    Object.assign(this, args);
  }
}
