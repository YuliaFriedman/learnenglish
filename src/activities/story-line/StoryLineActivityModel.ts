import { ActivityModel, ActivityProps } from "../../data-models/LevelStepModel";

export class Chunk{
  words: string[];
  isSign?: boolean;
  isSelected:boolean;
}

export class Relation {
  translation: number[];
  additionalChunks?: number[];
}

export class SentenceBlock {
  sentence: Chunk[];
  translation: Chunk[];
  sound?: string;
  relations: Record<number, Relation>;
}

export class StoryLineActivityModel extends ActivityModel{
  line: SentenceBlock;
}
