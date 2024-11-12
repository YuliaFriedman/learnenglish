import { ActivityModel } from "../../data-models/LevelStepModel";
import { SentenceBlock } from "../common/sentence-block/SentenceBlockComponentModel";

export class SaySentenceActivityModel extends ActivityModel{
  instructions?: string;
  sentence: SentenceBlock;
}
