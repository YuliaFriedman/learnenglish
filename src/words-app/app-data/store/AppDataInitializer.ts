import { categories } from "../levels/Categories";
import { ColorsSteps } from "../levels/steps/en-he/ColorsSteps";
import { AnimalsSteps } from "../levels/steps/en-he/AnimalsSteps";
import { VehiclesSteps } from "../levels/steps/en-he/VehiclesSteps";
import { BodySteps } from "../levels/steps/en-he/BodySteps";
import { Languages } from "../../../app-data/language.ts";
import { CategoryType } from "../models/CategoryModel.ts";
import { IAppDataInitializer } from "./IAppDataInitializer.ts";
import { IAppData } from "../models/AppDataModel.ts";

export class AppDataInitializer implements IAppDataInitializer{
  getData(): IAppData{
    return {
      categories: categories,
      steps: {
        [Languages.EN]: {
          [Languages.HE]: {
            [CategoryType.Colors]: ColorsSteps,
            [CategoryType.Animals]: AnimalsSteps,
            [CategoryType.Vehicle]: VehiclesSteps,
            [CategoryType.Body]: BodySteps
          }
        }
      }
    }
  }
}
