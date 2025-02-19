import { navigatorService } from "../routing/AppNavigatorService";
import { Level } from "../data-models/LevelModel";
import { Logger } from "../logger/Logger";

export interface LevelManagerType{
  currentLevel: Level|undefined;
  currentStep: number|undefined;
  startLevel: (level:Level) => void;
  loadNextStep: () => void;
}

export const LevelManager:LevelManagerType = {

  currentLevel: undefined,
  currentStep: undefined,

  startLevel: (level: Level) => {
    LevelManager.currentLevel = level;
    LevelManager.currentStep = 0;
    LevelManager.loadNextStep();
  },

  loadNextStep: () => {
    const numOfSteps = LevelManager.currentLevel?.steps.length ?? 0;
    if(LevelManager.currentStep != undefined && numOfSteps > LevelManager.currentStep) {
      Logger.log("LevelManager", "loading next step: level = " + LevelManager.currentLevel?.id + ", step = " + LevelManager.currentStep);
      navigatorService.navigate(LevelManager.currentLevel?.steps[LevelManager.currentStep].activityKey, LevelManager.currentLevel?.steps[LevelManager.currentStep].model);
      LevelManager.currentStep++;
    }
    else{
      Logger.log("LevelManager", "Level completed: level = " + LevelManager.currentLevel?.id + ", step = " + LevelManager.currentStep);
    }
  }
}
