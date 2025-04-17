import AllCategoriesComponent from "./components/all-categories-page-component/AllCategories.component";
import AppHeaderComponent from "./components/app-header/AppHeader.component";
import { View, ImageBackground } from "react-native";
import { WordsAppStyling } from "./WordsApp.styling";
import React from "react";
import { useSelector } from "react-redux";
import CategoriesStepsComponent from "./components/CategoryStepsComponent/CategoriesSteps.component";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackHeaderProps } from "@react-navigation/native-stack";
import { AppNavigation } from "./navigation/AppNavigation.component.tsx";
import { RoutesListValues } from "./app-data/models/routeValues.ts";
import { StepGamesManager } from "./components/games/step-games-manager/StepGamesManager.component.tsx";
import { CategoryCompleted } from "./components/completed-pages/category-completed/CategoryCompleted.component.tsx";
import { currentCategorySelector } from "./app-data/store/AppSelectors.ts";

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
        // <InversifyProvider container={InjectionManager.container}>
        //   <Provider store={store}>

              <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={WordsAppStyling.host}>
                  <View style={WordsAppStyling.content}>
                    <ImageBackground
                      source={require("../../assets/images/appbg.jpg")}
                      style={WordsAppStyling.host}
                    >
                      <View style={{ ...WordsAppStyling.host, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                      <NavigationContainer>
                        <AppNavigation>

                        <Stack.Navigator
                          initialRouteName={RoutesListValues.categories}
                          screenOptions={{ header: getTitle, contentStyle: { backgroundColor: 'transparent' } }}
                        >
                          <Stack.Screen name={RoutesListValues.categories} component={AllCategoriesComponent} />
                          <Stack.Screen name={RoutesListValues.steps} component={CategoriesStepsComponent} />
                          <Stack.Screen name={RoutesListValues.step} component={StepGamesManager} />
                          <Stack.Screen name={RoutesListValues.categoryCompleted} component={CategoryCompleted} />
                        </Stack.Navigator>
                        </AppNavigation>
                      </NavigationContainer>
                    </View>
                    </ImageBackground>
                  </View>
                </View>
              </GestureHandlerRootView>
          // </Provider>
        // </InversifyProvider>
      );



}
