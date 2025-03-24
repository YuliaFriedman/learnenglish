import { AppState } from "./Store.ts";
import { createSelector } from "@reduxjs/toolkit";
import { StepModel } from "../models/StepModel.ts";

export const currentStepIdSelector = (state: AppState) => state.steps.currentStep;
export const allStepsSelector = (state: AppState) => state.steps.allSteps;
export const selectedLanguageSelector = (state: AppState) => state.language.currentLanguage;
export const selectedTranslationSelector = (state: AppState) => state.language.currentTranslation;
export const selectedCategorySelector = (state: AppState) => state.categories.selectedCategory;
export const currentRouteSelector = (state: AppState) => state.navigation.currentRoute;
export const currentGameSelector = (state: AppState) => state.currentGame.currentGame;


export const currentStepSelector = createSelector(
  [allStepsSelector, currentStepIdSelector, selectedLanguageSelector, selectedTranslationSelector, selectedCategorySelector],
  (allSteps, currentStepId, language, translation, category) => {
    if (language && translation && category && currentStepId !== null) {
      return allSteps[language]?.[translation]?.[category]?.find((step: StepModel) => step.id === currentStepId);
    }
    return undefined;
  }
);
