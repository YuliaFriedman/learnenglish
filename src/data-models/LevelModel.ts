import { ActivityModel, ActivityProps, LevelStep } from "./LevelStepModel";

export enum LevelStatus {
  New,
  Started,
  Completed,
  Skipped,
}

export class Level {
  constructor(public readonly id: number, public readonly steps: LevelStep<ActivityModel>[]) {}
}
