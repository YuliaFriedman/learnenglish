import { Languages } from "../../../app-data/language.ts";
import { Category, CategoryType } from "./CategoryModel.ts";
import { StepModel } from "./StepModel.ts";

export type StepsModel = Partial<{
  [key in Languages]: Partial<{
    [key in Languages]: Partial<{
      [key in CategoryType]: StepModel[];
    }>;
  }>;
}>;

export interface IAppData {
  categories: Category[];
  steps: StepsModel;
}
