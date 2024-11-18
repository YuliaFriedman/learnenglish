import { StepModel, StepStatus } from "../../../models/StepModel";
import { GameType } from "../../../models/GameType";

export const ColorsSteps: StepModel[] = [
  {
    id: 1,
    displayName: "1",
    status: StepStatus.Idle,
    game: {
      type:  GameType.SelectTranslation,
      data: {
        source: true,
        word: "red",
        translations: ["red", "green", "blue", "yellow"]
      }
    }
  },
  {
    id: 0,
    displayName: "0",
    status: StepStatus.Idle,
    game: {
      type:  GameType.NewWord,
      data: {
        words: ["red", "green", "blue", "yellow"]
      }
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
