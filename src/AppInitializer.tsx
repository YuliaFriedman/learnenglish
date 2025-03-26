import React, { useEffect, useState } from "react";
import { initDependencyInjections } from "./words-app/dependency-injection/DepInjectionInitializer.ts";
import { Text, View } from "react-native";
import InjectionManager from "./core/services/InjectionManager.ts";
import { IAppProducer } from "./words-app/app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "./words-app/dependency-injection/DepInjectionTokens.ts";
import { IAudioManager } from "./sound/IAudioManager.ts";
import { IAppDataInitializer } from "./words-app/app-data/store/IAppDataInitializer.ts";
import { INavigationManager } from "./words-app/navigation/INavigationManager.tsx";

export function AppInitializer({children}: {children: React.ReactNode}) {

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initDependencyInjections();
    initData();
    setIsInitialized(true);
  }, []);

  function initData(){
    const appProducer = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    const appDataInitializer = InjectionManager.useInjection<IAppDataInitializer>(DepInjectionsTokens.APP_DATA_INITIALIZER);
    const appData = appDataInitializer.getData();
    if(appData) {
      appProducer?.setCategoriesList(appData.categories);
      appProducer.setAllSteps(appData.steps || {});
    }
  }

  if (isInitialized) {
    return (
      <>
        {children}
      </>
    )
  }
  else{
    return <View><Text>Loading...</Text></View>;
  }
}
