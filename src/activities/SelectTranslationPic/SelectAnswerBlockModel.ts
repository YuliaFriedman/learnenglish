import { Languages } from "../../app-data/language.ts";

export interface SelectAnswerBlockModel {
  id: number;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  word: string;
  language: Languages;
  pic?: string;
  onPress: () => void
}
