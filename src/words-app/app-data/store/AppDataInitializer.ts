import { categories } from "../levels/Categories";
import { ColorsSteps } from "../levels/steps/ColorsSteps";
import { AnimalsSteps } from "../levels/steps/AnimalsSteps";
import { VehiclesSteps } from "../levels/steps/VehiclesSteps";
import { BodySteps } from "../levels/steps/BodySteps";

export const appDataInitializer = {
  getData(){
    return {
      categories: categories,
      steps: {
        colors: ColorsSteps,
        animals: AnimalsSteps,
        vehicle: VehiclesSteps,
        body: BodySteps
      }
    }
  }
}
