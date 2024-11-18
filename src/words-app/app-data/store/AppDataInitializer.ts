import { categories } from "../levels/Categories";
import { ColorsSteps } from "../levels/steps/en-he/ColorsSteps";
import { AnimalsSteps } from "../levels/steps/en-he/AnimalsSteps";
import { VehiclesSteps } from "../levels/steps/en-he/VehiclesSteps";
import { BodySteps } from "../levels/steps/en-he/BodySteps";

export const appDataInitializer = {
  getData(){
    return {
      categories: categories,
      steps: {
        ["en-he"]: {
          colors: ColorsSteps,
          animals: AnimalsSteps,
          vehicle: VehiclesSteps,
          body: BodySteps
        }
      }
    }
  }
}
