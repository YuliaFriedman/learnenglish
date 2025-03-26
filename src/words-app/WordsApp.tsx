import AllCategoriesComponent from "./components/all-categories-page-component/AllCategories.component";
import AppHeaderComponent from "./components/app-header/AppHeader.component";
import { View, Text } from "react-native";
import { WordsAppStyling } from "./WordsApp.styling";
import React, { useEffect, useRef, useState } from "react";
import { Logger } from "../logger/Logger";
import { Provider, useSelector } from "react-redux";
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
import { StepGamesManager } from "./components/games/step-games-manager/StepGamesManager.component.tsx";
import { CategoryCompleted } from "./components/completed-pages/category-completed/CategoryCompleted.component.tsx";
import { INavigationManager } from "./navigation/INavigationManager.tsx";
import { currentCategorySelector, selectedCategoryTypeSelector } from "./app-data/store/AppSelectors.ts";

export function WordsApp(){

  const logSource = "WordsApp";

  const selectedCategory = useSelector(currentCategorySelector);

  const Stack = createNativeStackNavigator();

  function getTitle(props: NativeStackHeaderProps){
    let title = "Words App";
    switch (props.route.name) {
      case RoutesListValues.categories:
        title = "Words App";
      case RoutesListValues.steps:
        title = selectedCategory ? selectedCategory.title : "Words App";
      case RoutesListValues.game:
        title = selectedCategory ? selectedCategory.title : "Words App";
    }
    return <AppHeaderComponent title={title}></AppHeaderComponent>;
  }

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
                        <Stack.Screen name={RoutesListValues.step} component={StepGamesManager} />
                        <Stack.Screen name={RoutesListValues.categoryCompleted} component={CategoryCompleted} />
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
