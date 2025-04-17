import { StepModel, StepStatus } from "../../../models/StepModel";
import { GameType } from "../../../models/GameType";

export const AnimalsSteps: StepModel[] = [
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
  },
  {
    id: 4,
    displayName: "4",
    status: StepStatus.Idle,
    game: {
      type: GameType.NewWord
    }
  },
  {
    id: 5,
    displayName: "5",
    status: StepStatus.Idle,
    game: {
      type:  GameType.NewWord
    }
  },
];
