import { Logger } from "../../../../logger/Logger";
import { AnswerStatus } from "../../../common-models/AnswerStatus";

export class WordCardModel {
  id: string;
  word: string;
  image: string;
  sound: string;
  shouldSayTheWord?: boolean = false;
  onSpeakStarted?: () => void;
  onSpeakCompleted?: () => void;
  onPressed?: () => void;
  pressable?: boolean = true;
  language: string;
  translation?: string;
  isSelected?: boolean = false;
  answerStatus: AnswerStatus = AnswerStatus.notChecked;
  showText?: boolean = true;
  imgVisible?: boolean = true;
  disabled?: boolean = false;

  constructor(args: Partial<WordCardModel>) {
    this.id = args.id || "";
    this.word = args.word || "";
    this.image = args.image || "";
    this.sound = args.sound || "";
    this.shouldSayTheWord = args.shouldSayTheWord ?? args.shouldSayTheWord;
    this.onSpeakStarted = args.onSpeakStarted ?? args.onSpeakStarted;
    this.onSpeakCompleted = args.onSpeakCompleted ?? args.onSpeakCompleted;
    this.onPressed = args.onPressed ?? args.onPressed;
    this.pressable = args.pressable ?? args.pressable;
    this.language = args.language || "en";
    this.translation = args.translation ?? args.translation;
    this.isSelected = args.isSelected ?? this.isSelected;
    this.answerStatus = args.answerStatus ?? this.answerStatus;
    this.showText = args.showText ?? this.showText;
    this.imgVisible = args.imgVisible ?? this.imgVisible;
    this.disabled = args.disabled ?? this.disabled;
  }

}
