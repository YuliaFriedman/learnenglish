
export class WordTextCardModel {
  word: string;
  sound: string;
  shouldSayTheWord?: boolean = false;
  onSpeakStarted?: () => void;
  onSpeakCompleted?: () => void;
  onPressed?: () => void;
  pressable: boolean = true;
  language: string;
  translation?: string;
}
