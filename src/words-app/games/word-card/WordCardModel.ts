
export class WordCardModel {
  word: string;
  image: string;
  sound: string;
  shouldSayTheWord?: boolean = false;
  onSpeakStarted?: () => void;
  onSpeakCompleted?: () => void;
  pressable: boolean = true;
  language: string;
  translation?: string;
}
