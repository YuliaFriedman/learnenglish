import { Chunk } from "./ChunkModel";
import { Languages } from "../../app-data/language.ts";

export interface Sentence {
  language: Languages;
  chunks: Chunk[];
}
