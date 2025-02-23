import InjectionManager from "../../core/services/InjectionManager.ts";
import { IAppProducer } from "../app-data/store/IAppProducer.ts";
import { AppProducer } from "../app-data/store/AppProducer.ts";
import { DepInjectionsTokens } from "./DepInjectionTokens.ts";
import { AudioManager } from "../../sound/AudioManager.ts";
import { IAudioManager } from "../../sound/IAudioManager.ts";
import { IAppDataInitializer } from "../app-data/store/IAppDataInitializer.ts";
import { AppDataInitializer } from "../app-data/store/AppDataInitializer.ts";

export function initDependencyInjections(){
  InjectionManager.addInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN, AppProducer);
  InjectionManager.addInjection<IAudioManager>(DepInjectionsTokens.AUDIO_MANAGER_TOKEN, AudioManager);
  InjectionManager.addInjection<IAppDataInitializer>(DepInjectionsTokens.APP_DATA_INITIALIZER, AppDataInitializer);
}
