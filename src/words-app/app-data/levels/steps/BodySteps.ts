import { StepModel, StepStatus } from "../../models/StepModel";
import { GameType } from "../../models/GameType";

export const BodySteps: StepModel[] = [
  {
    id: 0,
    displayName: "0",
    status: StepStatus.Idle,
    game: {
      type:  GameType.NewWord
    }
  },
  {
    id: 1,
    displayName: "1",
    status: StepStatus.Idle,
    game: {
      type:  GameType.NewWord
    }
  },
  {
    id: 2,
    displayName: "2",
    status: StepStatus.Idle,
    game: {
      type:  GameType.NewWord
    }
  }
];
