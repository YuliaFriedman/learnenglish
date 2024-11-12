export interface SelectAnswerBlockModel {
  id: number;
  isSelected: boolean;
  isCorrectAnswer: boolean;
  word: string;
  language: string;
  pic?: string;
  onPress: () => void
}
