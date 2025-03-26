import { AppState } from "./Store.ts";
import { createSelector } from "@reduxjs/toolkit";
import { StepModel } from "../models/StepModel.ts";
import { Category } from "../models/CategoryModel.ts";

export const currentStepIdSelector = (state: AppState) => state.steps.currentStep;
export const allStepsSelector = (state: AppState) => state.steps.allSteps;
export const selectedLanguageSelector = (state: AppState) => state.language.currentLanguage;
export const selectedTranslationSelector = (state: AppState) => state.language.currentTranslation;
export const selectedCategoryTypeSelector = (state: AppState) => state.categories?.selectedCategory;
export const currentRouteSelector = (state: AppState) => state.navigation.currentRoute;
export const currentGameSelector = (state: AppState) => state.currentGame.currentGame;
export const categoriesListSelector = (state: AppState) => state.categories?.categoriesList;


export const currentStepSelector = createSelector(
  [allStepsSelector, currentStepIdSelector, selectedLanguageSelector, selectedTranslationSelector, selectedCategoryTypeSelector],
  (allSteps, currentStepId, language, translation, category) => {
    if (language && translation && category && currentStepId !== null) {
      return allSteps[language]?.[translation]?.[category]?.find((step: StepModel) => step.id === currentStepId);
    }
    return undefined;
  }
);

export const currentCategorySelector = createSelector(
  [categoriesListSelector, selectedCategoryTypeSelector],
  (categoriesList, selectedCategory) => {
    return categoriesList?.find((category: Category) => category.type === selectedCategory);
  }
);

export const currentStepsSelector = createSelector(
  [allStepsSelector, selectedLanguageSelector, selectedTranslationSelector, selectedCategoryTypeSelector],
  (allSteps, language, translation, category) => {
    if (language && translation && category) {
      return allSteps[language]?.[translation]?.[category] || [];
    }
    return [];
  }
);
