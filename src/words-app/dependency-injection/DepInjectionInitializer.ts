import InjectionManager from "../../core/services/InjectionManager.ts";
import { IAppProducer } from "../app-data/store/IAppProducer.ts";
import { AppProducer } from "../app-data/store/AppProducer.ts";
import { DepInjectionsTokens } from "./DepInjectionTokens.ts";

export function initDependencyInjections(){
  InjectionManager.addInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN, AppProducer);
}
