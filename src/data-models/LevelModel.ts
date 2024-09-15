import { ActivityModel, LevelStep } from "./LevelStepModel";

export enum LevelStatus {
  New,
  Started,
  Completed,
  Skipped,
}

export class Level {
  constructor(public readonly id: string, public readonly steps: LevelStep<ActivityModel>[]) {}
}
