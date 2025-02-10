import AllCategoriesComponent from "./components/all-categories-page-component/AllCategories.component";
import AppHeaderComponent from "./components/app-header/AppHeader.component";
import { View } from "react-native";
import { WordsAppStyling } from "./WordsApp.styling";
import React, { useEffect, useState } from "react";
import { navigationInitializer, WordsAppPages } from "./navigation/WordsAppPages";
import { navigatorService, PageInfo } from "../routing/AppNavigatorService";
import { Logger } from "../logger/Logger";
import { Provider } from "react-redux";
import store from "./app-data/store/Store";
import { appProducer } from "./app-data/store/AppProducer";
import { categories } from "./app-data/levels/Categories";
import CategoriesStepsComponent from "./components/CategoryStepsComponent/CategoriesSteps.component";
import { appDataInitializer } from "./app-data/store/AppDataInitializer";
import { AudioManager } from "../sound/AudioManager";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GameContainerComponent from "./components/games/game-container/GameContainer.component";

export function WordsApp(){

  const logSource = "WordsApp";

  const [visiblePage, setVisiblePage] = useState<PageInfo|undefined>(navigatorService.getVisible());
  const [title,setTitle] = useState("");
  const [page,setPage] = useState(<></>);



  useEffect(() => {
    initData();
    navigationInitializer.init();
    AudioManager.init();
    const handleNavigation = (page:PageInfo) =>{
      setVisiblePage(page);
      Logger.log(logSource, "NAVIGATIONN CHANGED: in page " + page.key);
    }
    const unregister = navigatorService.addListener('navigation-changed', handleNavigation);
    navigatorService.navigate(WordsAppPages.categories);
    return () => {
      Logger.log(logSource, "NAVIGATION LISTENER REMOVED: remove 'navigation-changed' listener");
      unregister.remove();
    }
  },[])

  useEffect(() => {
    buildPageAndTitle();
  },[appProducer.getSelectedCategory(),visiblePage]);

  function initData(){
    const appData = appDataInitializer.getData();
    appProducer.setCategoriesList(appData.categories);
    appProducer.setAllSteps(appData.steps);
  }

  function buildPageAndTitle(){
    let newTitle = "N/A";
    let newPage = <></>;
    if(visiblePage) {
      switch (visiblePage.key) {
        case WordsAppPages.categories:
          newPage = <AllCategoriesComponent></AllCategoriesComponent>;
          newTitle = "Words App";
          break;
        case WordsAppPages.steps:
          newPage = <CategoriesStepsComponent></CategoriesStepsComponent>;
          const selectedCategoryId = appProducer.getSelectedCategory();
          const selectedCategory = appProducer.getCategory(selectedCategoryId);
          newTitle = selectedCategory ? selectedCategory.title : "Words App";
          break;
        case WordsAppPages.game:
          newPage = <GameContainerComponent></GameContainerComponent>
          newTitle = "Game";
          break;
      }
    }

    setTitle(newTitle);
    setPage(newPage);
  }


  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={WordsAppStyling.host}>
          <AppHeaderComponent title={title}></AppHeaderComponent>
          {page}
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}
