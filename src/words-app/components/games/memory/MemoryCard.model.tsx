import { WordCardModel } from "../word-card/WordCardModel.ts";

export interface MemoryCard {
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
  word: WordCardModel;
}
