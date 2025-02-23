import { AnswerStatus } from "../../../app-data/models/AnswerStatus.ts";
import { PartialWithRequiredProp } from "../../../../utils/Common-Types.ts";
import { Languages } from "../../../../app-data/language.ts";

export class WordCardModel {
  id: string = "";
  word: string = "";
  image: string = "";
  sound: string = "";
  shouldSayTheWord?: boolean = false;
  pressable?: boolean = true;
  language: Languages = Languages.EN;
  translation?: Languages;
  isSelected?: boolean = false;
  answerStatus: AnswerStatus = AnswerStatus.notChecked;
  showText?: boolean = true;
  imgVisible?: boolean = true;
  disabled?: boolean = false;

  constructor(args: PartialWithRequiredProp<WordCardModel, 'id'>) {
    Object.assign(this, args);
  }

}
