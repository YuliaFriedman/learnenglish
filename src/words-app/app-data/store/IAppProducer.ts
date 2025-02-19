import store from "./Store.ts";
import { Logger } from "../../../logger/Logger.ts";
import { Category } from "../models/CategoryModel.ts";
import { setSelectedStep, SingleLanguageSteps } from "./reducers/StepsReducer.ts";
import { StepModel } from "../models/StepModel.ts";
import { Languages } from "../../../app-data/language.ts";

export interface IAppProducer {

  getSelectedCategory: () => string | null;
  setSelectedCategory: (selected: string) => void;
  getCategoriesList: () => Category[];
  getCategory: (id:string|null) => Category | undefined;
  setCategoriesList: (categories: Category[]) => void;
  setAllSteps: (steps: Record<string, SingleLanguageSteps>) => void;
  getStepsByCategory: (category: string|null) => StepModel[];
  getCurrentSteps: () => StepModel[];
  setCurrentStep: (step:number|null) => void;
  getCurrentStepId: () => number|null;
  setNextStep: () => boolean;
  getCurrentStep: () => StepModel|undefined;
  getStepById: (id: number|null) => StepModel|undefined;
  getSelectedLanguage: () => Languages;
  getSelectedTranslation: () => Languages;
}
