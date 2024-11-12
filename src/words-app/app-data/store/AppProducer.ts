import store, { AppState, useAppDispatch } from "./Store";
import { useSelector } from "react-redux";
import { setCategoriesList, setSelectedCategory } from "./reducers/CategoriesReducer";
import { Category } from "../models/CategoryModel";
import { StepModel } from "../models/StepModel";
import { setAllSteps, setSelectedStep } from "./reducers/StepsReducer";
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

  getCategory = (id:string) => {
    return store.getState().categories.categoriesList.find(category => category.id === id);
  }

  setCategoriesList = (categories: Category[]) => {
    store.dispatch(setCategoriesList(categories));
  }

  // steps

  setAllSteps = (steps: Record<string, StepModel[]>) => {
    Logger.log(this.logSource, "setting all steps = ", false, steps);
    store.dispatch(setAllSteps(steps));
  }

  getStepsByCategory = (category: string): StepModel[] => {
    return store.getState()?.steps?.allSteps[category];
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

  getCurrentStep = () => {
    return this.getStepById(this.getCurrentStepId());
  }

  getStepById = (id: number): StepModel|undefined => {
    return this.getCurrentSteps().find(step => step.id === id);
  }
}

export const appProducer = new AppProducer();
