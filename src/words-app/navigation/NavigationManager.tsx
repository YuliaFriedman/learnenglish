import { IAppProducer } from "../app-data/store/IAppProducer.ts";
import InjectionManager from "../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../dependency-injection/DepInjectionTokens.ts";
import { RoutesListValues } from "../app-data/models/routeValues.ts";
import { INavigationManager } from "./INavigationManager.tsx";
import { Logger } from "../../logger/Logger.ts";
import { GameType } from "../app-data/models/GameType.ts";

export class NavigationManager implements INavigationManager{

  logSource = "NavigationManager";
  appProducer: IAppProducer;

  constructor(){
    //this.appProducer = useRef<IAppProducer>( InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN) );
    this.appProducer = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
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
      // if current is exam
      else if(this.isExamStep(currentStepIndex)){
        this.appProducer.setNavigationRoute(RoutesListValues.step, {screen: RoutesListValues.stepsGroupCompleted});
        return true;
      }
      // if next is exam
      else if(this.isExamStep(currentStepIndex + 1)){
        this.appProducer.setCurrentStep(steps[currentStepIndex + 1].id);
        this.appProducer.setNavigationRoute(RoutesListValues.step, {screen: RoutesListValues.exam});
        return true;
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
      if(this.isExamStep(stepIndex)){
        this.appProducer.setNavigationRoute(RoutesListValues.step, {screen: RoutesListValues.exam});
      }
      else{
        this.appProducer.setNavigationRoute(RoutesListValues.step, {screen: RoutesListValues.game});
      }
    }
  }

  isExamStep(stepIndex: number): boolean {
    const steps = this.appProducer.getCurrentSteps();
    if(steps && steps.length > stepIndex){
      return steps[stepIndex].game?.type === GameType.Test;
    }
    return false;
  }

}
