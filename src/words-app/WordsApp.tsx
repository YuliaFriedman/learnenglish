import AllCategoriesComponent from "./components/all-categories-page-component/AllCategories.component";
import AppHeaderComponent from "./components/app-header/AppHeader.component";
import { View, Text } from "react-native";
import { WordsAppStyling } from "./WordsApp.styling";
import React, { useEffect, useRef, useState } from "react";
import { Logger } from "../logger/Logger";
import { Provider } from "react-redux";
import store from "./app-data/store/Store";
import CategoriesStepsComponent from "./components/CategoryStepsComponent/CategoriesSteps.component";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GameContainerComponent from "./components/games/game-container/GameContainer.component";
import { initDependencyInjections } from "./dependency-injection/DepInjectionInitializer.ts";
import InjectionManager from "../core/services/InjectionManager.ts";
import { Provider as InversifyProvider} from 'inversify-react';
import { IAppProducer } from "./app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "./dependency-injection/DepInjectionTokens.ts";
import { IAudioManager } from "../sound/IAudioManager.ts";
import { IAppDataInitializer } from "./app-data/store/IAppDataInitializer.ts";
import { ThemeManager } from "./style/ThemeManager.ts";
import { TileOutfitComponent } from "./components/common/tile-outfit/TileOutfit.component.tsx";
import LinearGradient from "react-native-linear-gradient";
import RadialGradient from "react-native-radial-gradient";
import { getScreenDimensions } from "../style/dimentions.ts";
import { DecorOverlayArcComponent } from "../core/components/decor-overlay-arc/DecorOverlayArcComponent.tsx";
import { GradientLayout } from "../core/components/gradient-layout/GradientLayout.tsx";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackHeaderProps } from "@react-navigation/native-stack";
import { AppNavigation } from "./navigation/AppNavigation.component.tsx";
import { RoutesListValues } from "./app-data/models/routeValues.ts";
import { GameManager } from "./components/games/game-manager/GameManager.component.tsx";

export function WordsApp(){

  const logSource = "WordsApp";

  const [isInitialized, setIsInitialized] = useState(false);
  const appProducer = useRef<IAppProducer | null>(null);
  const audioManager = useRef<IAudioManager | null>(null);
  const appDataInitializer = useRef<IAppDataInitializer | null>(null);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    initDependencyInjections();
    initInjections();
    initData();
    setIsInitialized(true);
  },[])

  function initInjections(){
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }

    if(!audioManager.current){
      audioManager.current = InjectionManager.useInjection<IAudioManager>(DepInjectionsTokens.AUDIO_MANAGER_TOKEN);
    }

    if(!appDataInitializer.current){
      appDataInitializer.current = InjectionManager.useInjection<IAppDataInitializer>(DepInjectionsTokens.APP_DATA_INITIALIZER);
    }
  }

  function initData(){
    const appData = appDataInitializer.current?.getData();
    if(appData) {
      appProducer.current?.setCategoriesList(appData.categories);
      appProducer.current?.setAllSteps(appData.steps || {});
    }
  }

  function buildPageAndTitle(){
    // let newTitle = "N/A";
    // let newPage = <></>;
    // if(visiblePage) {
    //   switch (visiblePage.key) {
    //     case WordsAppPages.categories:
    //       newPage = <AllCategoriesComponent></AllCategoriesComponent>;
    //       newTitle = "Words App";
    //       break;
    //     case WordsAppPages.steps:
    //       newPage = <CategoriesStepsComponent></CategoriesStepsComponent>;
    //       let selectedCategory = getSelectedCategory();
    //       newTitle = selectedCategory ? selectedCategory.title : "Words App";
    //       break;
    //     case WordsAppPages.game:
    //       newPage = <GameContainerComponent></GameContainerComponent>
    //       selectedCategory = getSelectedCategory();
    //       newTitle = selectedCategory ? selectedCategory.title : "Words App";
    //       break;
    //   }
    // }
    //
    // setTitle(newTitle);
    // setPage(newPage);
  }

  function getSelectedCategory(){
    const selectedCategoryId = appProducer.current?.getSelectedCategory();
    return selectedCategoryId ? appProducer.current?.getCategory(selectedCategoryId) : null;
  }

  function getTitle(props: NativeStackHeaderProps){
    let title = "Words App";
    switch (props.route.name) {
      case RoutesListValues.categories:
        title = "Words App";
      case RoutesListValues.steps:
        let selectedCategory = getSelectedCategory();
        title = selectedCategory ? selectedCategory.title : "Words App";
      case RoutesListValues.game:
        selectedCategory = getSelectedCategory();
        title = selectedCategory ? selectedCategory.title : "Words App";
    }
    return <AppHeaderComponent title={title}></AppHeaderComponent>;
  }

    if (isInitialized) {
      return (
        <InversifyProvider container={InjectionManager.container}>
          <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <View style={WordsAppStyling.host}>
                <View style={WordsAppStyling.content}>
                  <GradientLayout
                    style={WordsAppStyling.contentBG}
                    model={ThemeManager.theme.content.bg1}
                  ></GradientLayout>

                  <GradientLayout
                    style={WordsAppStyling.contentBG}
                    model={ThemeManager.theme.content.bg2}
                  ></GradientLayout>

                    <NavigationContainer>
                      <AppNavigation>
                      <Stack.Navigator
                        initialRouteName={RoutesListValues.categories}
                        screenOptions={{ header: getTitle }}
                      >
                        <Stack.Screen name={RoutesListValues.categories} component={AllCategoriesComponent} />
                        <Stack.Screen name={RoutesListValues.steps} component={CategoriesStepsComponent} />
                        <Stack.Screen name={RoutesListValues.step} component={GameManager} />
                      </Stack.Navigator>
                      </AppNavigation>
                    </NavigationContainer>

                </View>
              </View>
            </GestureHandlerRootView>
          </Provider>
        </InversifyProvider>
      );
    }
    else{
      return <View><Text>Loading...</Text></View>;
    }

}
