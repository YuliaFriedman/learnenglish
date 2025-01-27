import store, { AppState, useAppDispatch } from "./Store";
import { useSelector } from "react-redux";
import { setCategoriesList, setSelectedCategory } from "./reducers/CategoriesReducer";
import { Category } from "../models/CategoryModel";
import { StepModel } from "../models/StepModel";
import { setAllSteps, setSelectedStep, SingleLanguageSteps } from "./reducers/StepsReducer";
import { Logger } from "../../../logger/Logger";

class AppProducer {
  //dispatch = useAppDispatch();

  // selected category

  logSource = "AppProducer";

  getSelectedCategory = () => {
    return store.getState().categories.selectedCategory;
  }

  setSelectedCategory = (selected: string) => {
    Logger.log(this.logSource, "IN setSelectedCategory: selected = " + selected);
    store.dispatch(setSelectedCategory(selected));
  }

  // categories list

  getCategoriesList = () => {
    //return useSelector((state: AppState) => state.categories.categoriesList);
    return store.getState().categories.categoriesList;
  }

  getCategory = (id:string|null) => {
    return store.getState().categories.categoriesList.find(category => category.id === id);
  }

  setCategoriesList = (categories: Category[]) => {
    store.dispatch(setCategoriesList(categories));
  }

  // steps

  setAllSteps = (steps: Record<string, SingleLanguageSteps>) => {
    Logger.log(this.logSource, "setting all steps = ", false, steps);
    store.dispatch(setAllSteps(steps));
  }

  getStepsByCategory = (category: string|null): StepModel[] => {
    if(category === null){
      return [];
    }
    const language = this.getSelectedLanguage();
    const translation = this.getSelectedTranslation();
    return store.getState()?.steps?.allSteps[language + "-" + translation][category];
  }

  getCurrentSteps = (): StepModel[] => {
    return this.getStepsByCategory(this.getSelectedCategory());
  }

  setCurrentStep  = (step:number|null) => {
    store.dispatch(setSelectedStep(step));
  }

  getCurrentStepId = () => {
    return store.getState()?.steps?.currentStep;
  }

  setNextStep = () => {
    const currentStepId = this.getCurrentStepId();
    const steps = this.getCurrentSteps();
    const currentStepIndex = steps.findIndex(step => step.id === currentStepId);
    // if last
    if(currentStepIndex === steps.length - 1){
      Logger.log(this.logSource, "IN setNextStep: this is last step " + currentStepIndex);
      return false;
    }
    else{
      Logger.log(this.logSource, "IN setNextStep: Moving to step " + (currentStepIndex + 1), false, steps[currentStepIndex + 1]);
      this.setCurrentStep(steps[currentStepIndex + 1].id);
      return true;
    }
  }

  getCurrentStep = () => {
    return this.getStepById(this.getCurrentStepId());
  }

  getStepById = (id: number|null): StepModel|undefined => {
    return this.getCurrentSteps().find(step => step.id === id);
  }

  // language

  getSelectedLanguage = () => {
    return store.getState()?.language.currentLanguage;
  }

  getSelectedTranslation = () => {
    return store.getState()?.language.currentTranslation;
  }
}

export const appProducer = new AppProducer();
