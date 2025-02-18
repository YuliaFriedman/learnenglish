import { PartialWithRequiredProp } from "../../../../utils/Common-Types.ts";

export class WordTextCardModel {
  id: string = "";
  word: string = "";
  sound: string = "";
  shouldSayTheWord?: boolean = false;
  pressable?: boolean = true;
  language: string = "";
  translation?: string;
  showMic?: boolean = true;

  constructor(args: PartialWithRequiredProp<WordTextCardModel, 'id'> ) {
    Object.assign(this, args);
  }
}
