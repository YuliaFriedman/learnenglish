import { ActivityModel } from "../../data-models/LevelStepModel";
import { Languages } from "../../app-data/language";

export class PictureWord{
  word: string;
  language: Languages;
  picture?: string;
}

export class SelectTranslationPicActivityModel extends ActivityModel{
  instructions?: string;
  word: string;
  language: string;
  answers: PictureWord[];
  correctAnswer: number;
}
