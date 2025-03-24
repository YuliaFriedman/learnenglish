import { Category, CategoryType } from "../models/CategoryModel.ts";
import { StepModel } from "../models/StepModel.ts";
import { Languages } from "../../../app-data/language.ts";
import { StepsModel } from "../models/AppDataModel.ts";
import { SelectedCategory } from "./reducers/CategoriesReducer.ts";
import { RoutesListValues } from "../models/routeValues.ts";
import { NestedParamsType, ParamsType } from "./reducers/AppNavigation.state.ts";
import { GameModel } from "../models/GameModel.ts";

export interface IAppProducer {

  getSelectedCategory: () => SelectedCategory;
  setSelectedCategory: (selected: string) => void;
  getCategoriesList: () => Category[];
  getCategory: (type: SelectedCategory) => Category | undefined;
  setCategoriesList: (categories: Category[]) => void;
  setAllSteps: (steps: StepsModel) => void;
  getStepsByCategory: (category: SelectedCategory) => StepModel[]|undefined;
  getCurrentSteps: () => StepModel[]|undefined;
  setCurrentStep: (step:number|null) => void;
  getCurrentStepId: () => number|null;
  setNextStep: () => boolean;
  getCurrentStep: () => StepModel|undefined;
  getStepById: (id: number|null) => StepModel|undefined;
  getSelectedLanguage: () => Languages;
  getSelectedTranslation: () => Languages;
  setNavigationRoute: (routeName: RoutesListValues, params?: ParamsType) => void;
  setNestedNavigationRoute: (routeName: RoutesListValues, params: NestedParamsType) => void;
  setCurrentGame: (game: GameModel | undefined) => void;
}
