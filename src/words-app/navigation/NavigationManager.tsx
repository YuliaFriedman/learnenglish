import { IAppProducer } from "../app-data/store/IAppProducer.ts";
import { RoutesListValues } from "../app-data/models/routeValues.ts";
import { INavigationManager } from "./INavigationManager.tsx";
import { Logger } from "../../logger/Logger.ts";
import { GameType } from "../app-data/models/GameType.ts";

export class NavigationManager implements INavigationManager{

  logSource = "NavigationManager";

  constructor(private appProducer: IAppProducer) {
  }

  navigateHome(){
    this.appProducer.setNavigationRoute(RoutesListValues.categories);
  }

  goToNextStep(){
    const currentStepId = this.appProducer.getCurrentStepId();
    const steps = this.appProducer.getCurrentSteps();
    const currentStepIndex = steps?.findIndex(step => step.id === currentStepId);

    if(steps && currentStepIndex != undefined && currentStepIndex >= 0) {
      // if last
      if (currentStepIndex === steps.length - 1) {
        this.appProducer.setNavigationRoute(RoutesListValues.categoryCompleted);
      }
      // if next is game
      else
       {
        Logger.log(this.logSource, "IN setNextStep: Moving to step " + (currentStepIndex + 1), false, steps[currentStepIndex + 1]);
        this.appProducer.setCurrentStep(steps[currentStepIndex + 1].id);
        return true;
      }
    }
    return false;
  }

  navigateToStep(id: number){
    const steps = this.appProducer.getCurrentSteps();
    Logger.log(this.logSource, "Navigating to step " + id);
    if(!steps){
      return;
    }
    const stepIndex = steps.findIndex(step => step.id === id);
    if(stepIndex >= 0){
      this.appProducer.setCurrentStep(id);
      this.appProducer.setNavigationRoute(RoutesListValues.step, {screen: RoutesListValues.game});
    }
  }


}
