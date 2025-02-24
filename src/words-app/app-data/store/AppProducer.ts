import store from "./Store";
import { SelectedCategory, setCategoriesList, setSelectedCategory } from "./reducers/CategoriesReducer";
import { Category, CategoryType } from "../models/CategoryModel";
import { StepModel } from "../models/StepModel";
import { setAllSteps, setSelectedStep } from "./reducers/StepsReducer";
import { Logger } from "../../../logger/Logger";
import { IAppProducer } from "./IAppProducer.ts";
import { StepsModel } from "../models/AppDataModel.ts";

export class AppProducer implements IAppProducer{

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

  getCategory = (type: SelectedCategory) => {
    return store.getState().categories.categoriesList.find(category => category.type === type);
  }

  setCategoriesList = (categories: Category[]) => {
    store.dispatch(setCategoriesList(categories));
  }

  // steps

  setAllSteps = (steps: StepsModel) => {
    Logger.log(this.logSource, "setting all steps = ", false, steps);
    store.dispatch(setAllSteps(steps));
  }

  getStepsByCategory = (category: SelectedCategory): StepModel[]|undefined => {
    if(category === null){
      return [];
    }
    const language = this.getSelectedLanguage();
    const translation = this.getSelectedTranslation();
    const allSteps = store.getState()?.steps?.allSteps;
    // @ts-ignore
    if(allSteps[language] && allSteps[language][translation]){
      // @ts-ignore
      return allSteps[language][translation][category];
    }
  }

  getCurrentSteps = (): StepModel[]|undefined => {
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
    const currentStepIndex = steps?.findIndex(step => step.id === currentStepId);

    if(steps && currentStepIndex != undefined && currentStepIndex >= 0) {
      // if last
      if (currentStepIndex === steps.length - 1) {
        Logger.log(this.logSource, "IN setNextStep: this is last step " + currentStepIndex);
        return false;
      } else {
        Logger.log(this.logSource, "IN setNextStep: Moving to step " + (currentStepIndex + 1), false, steps[currentStepIndex + 1]);
        this.setCurrentStep(steps[currentStepIndex + 1].id);
        return true;
      }
    }
    return false;
  }

  getCurrentStep = () => {
    return this.getStepById(this.getCurrentStepId());
  }

  getStepById = (id: number|null): StepModel|undefined => {
    return this.getCurrentSteps()?.find(step => step.id === id);
  }

  // language

  getSelectedLanguage = () => {
    return store.getState()?.language.currentLanguage;
  }

  getSelectedTranslation = () => {
    return store.getState()?.language.currentTranslation;
  }
}
