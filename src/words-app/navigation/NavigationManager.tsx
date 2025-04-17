import { IAppProducer } from "../app-data/store/IAppProducer.ts";
import { RoutesListValues } from "../app-data/models/routeValues.ts";
import { INavigationManager, ParamsType } from "./INavigationManager.tsx";
import { Logger } from "../../logger/Logger.ts";
import { RoutesList } from "../app-data/models/routes.ts";
import { StackNavigationProp } from "@react-navigation/stack";

export class NavigationManager implements INavigationManager{

  logSource = "NavigationManager";

  constructor(private appProducer: IAppProducer, private navigation: StackNavigationProp<RoutesList>) {
  }

  navigateHome(){
    this.navigation.navigate(RoutesListValues.categories)
  }

  goToNextStep(){
    const currentStepId = this.appProducer.getCurrentStepId();
    const steps = this.appProducer.getCurrentSteps();
    const currentStepIndex = steps?.findIndex(step => step.id === currentStepId);

    if(steps && currentStepIndex != undefined && currentStepIndex >= 0) {
      // if last
      if (currentStepIndex === steps.length - 1) {
        this.navigation.navigate(RoutesListValues.categoryCompleted)
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
      this.navigation.navigate(RoutesListValues.game)
    }
  }

  navigateTo(routeName: RoutesListValues, params?: ParamsType){
    if (params !== undefined) {
      this.navigation.navigate(routeName as string, params as object);
    } else {
      this.navigation.navigate(routeName as string);
    }
  }
}
