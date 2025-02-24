import AllCategoriesComponent from "./components/all-categories-page-component/AllCategories.component";
import AppHeaderComponent from "./components/app-header/AppHeader.component";
import { View } from "react-native";
import { WordsAppStyling } from "./WordsApp.styling";
import React, { useEffect, useRef, useState } from "react";
import { navigationInitializer, WordsAppPages } from "./navigation/WordsAppPages";
import { navigatorService, PageInfo } from "../routing/AppNavigatorService";
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

export function WordsApp(){

  const logSource = "WordsApp";

  const [visiblePage, setVisiblePage] = useState<PageInfo|undefined>(navigatorService.getVisible());
  const [title,setTitle] = useState("");
  const [page,setPage] = useState(<></>);

  const appProducer = useRef<IAppProducer | null>(null);
  const audioManager = useRef<IAudioManager | null>(null);
  const appDataInitializer = useRef<IAppDataInitializer | null>(null);

  useEffect(() => {
    initDependencyInjections();
    initInjections();
    initData();
    navigationInitializer.init();
    //audioManager.current?.init();
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
  },[appProducer.current?.getSelectedCategory(),visiblePage]);

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
          const selectedCategoryId = appProducer.current?.getSelectedCategory();
          const selectedCategory = selectedCategoryId ? appProducer.current?.getCategory(selectedCategoryId) : null;
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
    <InversifyProvider container={InjectionManager.container}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={WordsAppStyling.host}>
            <View style={WordsAppStyling.header}>
              <AppHeaderComponent title={title}></AppHeaderComponent>
            </View>
            <View style={WordsAppStyling.content}>
              <LinearGradient
                style={WordsAppStyling.contentBG}
                colors={ThemeManager.theme.content.bgColors}
                locations={ThemeManager.theme.content.bgLocations}
                start={ThemeManager.theme.content.start}
                end={ThemeManager.theme.content.end}
              ></LinearGradient>
              {page}
            </View>
          </View>
        </GestureHandlerRootView>
      </Provider>
     </InversifyProvider>
  );
}
