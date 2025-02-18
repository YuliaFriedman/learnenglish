import { Logger } from "../../../../logger/Logger";
import { AnswerStatus } from "../../../common-models/AnswerStatus";
import { PartialWithRequiredProp } from "../../../../utils/Common-Types.ts";

export class WordCardModel {
  id: string = "";
  word: string = "";
  image: string = "";
  sound: string = "";
  shouldSayTheWord?: boolean = false;
  pressable?: boolean = true;
  language: string = "";
  translation?: string;
  isSelected?: boolean = false;
  answerStatus: AnswerStatus = AnswerStatus.notChecked;
  showText?: boolean = true;
  imgVisible?: boolean = true;
  disabled?: boolean = false;

  constructor(args: PartialWithRequiredProp<WordCardModel, 'id'>) {
    Object.assign(this, args);
  }

}
