import { GameType } from "./GameType";
import { GameModel } from "./GameModel";

export enum StepStatus {
  Idle = "idle",
  Completed = "completed",
  Skipped = "skipped"
}

export interface StepModel{
  id: number;
  displayName: string,
  status: StepStatus,
  game: GameModel
}
