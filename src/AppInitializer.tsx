import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Services, ServicesProvider } from "./words-app/dependency-injection/ServicesContext.tsx";
import { AppProducer } from "./words-app/app-data/store/AppProducer.ts";
import { AudioManager } from "./sound/AudioManager.ts";
import { AppDataInitializer } from "./words-app/app-data/store/AppDataInitializer.ts";
import { NavigationManager } from "./words-app/navigation/NavigationManager.tsx";
import { RoutesList } from "./words-app/app-data/models/routes.ts";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export function AppInitializer({children}: {children: React.ReactNode}) {

  const [isInitialized, setIsInitialized] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RoutesList>>();
  const services:Services = getServices();

  useEffect(() => {
    initData();
    setIsInitialized(true);
  }, []);

  function getServices(){
    const appProducer = new AppProducer();
    const audioManager = new AudioManager();
    const appDataInitializer = new AppDataInitializer();
    const navigationManager = new NavigationManager(appProducer, navigation);

    return {
      appProducer: appProducer,
      audioManager: audioManager,
      appDataInitializer: appDataInitializer,
      navigationManager: navigationManager
    };
  }

  function initData(){
    const appData = services.appDataInitializer.getData();
    if(appData) {
      services.appProducer.setCategoriesList(appData.categories);
      services.appProducer.setAllSteps(appData.steps || {});
    }
  }

  if (isInitialized) {
    return (
      <ServicesProvider services={services}>
        {children}
      </ServicesProvider>
    )
  }
  else{
    return <View><Text>Loading...</Text></View>;
  }
}
