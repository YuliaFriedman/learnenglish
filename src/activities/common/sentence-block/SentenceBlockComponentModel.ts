import { Sentence } from "../../common-models/SentenceModel";

export class Relation {
  translation: number[];
  additionalChunks?: number[];
}

export class SentenceBlock {
  sentence: Sentence
  translation: Sentence
  sound?: string;
  relations: Record<number, Relation>;
}
