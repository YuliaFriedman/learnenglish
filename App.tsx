/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, useColorScheme, View } from "react-native";

import { LevelsList } from "./src/levels screen/LevelsList";
import { StoryActivity } from "./src/activities/story/StoryActivity";
import { navigatorService, Page, PageInfo } from "./src/routing/AppNavigatorService";
import { AppStyles } from "./App.Styling";
import { levels_en_he } from "./src/app-data/levels/en-he/Levels_en_he";
import { AudioManager } from "./src/sound/AudioManager";
import { Provider } from "react-redux";
import store from "./src/store/Store";
import { ViewProducer } from "./src/store/viewProducer";
import { StoryLineActivity } from "./src/activities/story-line/StoryLineActivityComponent";
import { Logger } from "./src/logger/Logger";
import { SelectTranslationPicActivity } from "./src/activities/SelectTranslationPic/SelectTranslationPicActivityComponent";

function App(): React.JSX.Element {
  Logger.log("App", "IN App...",true)

  const scrollViewRef = useRef<ScrollView|null>(null);
  const ScrollToEndValue = ViewProducer.getScrollToEndValue();
  const [visiblePage, setVisiblePage] = useState<PageInfo|undefined>(navigatorService.getVisible());

  useEffect(() => {
    AudioManager.init();
    const handleNavigation = (page:PageInfo) =>{
      Logger.log("App", "navigation changed: in page " + page.key);
      setVisiblePage(page);
    }

    Logger.log("App", "register to 'navigation-changed'");
    const unregister = navigatorService.addListener('navigation-changed', handleNavigation);

    navigatorService.navigate(Page.LevelsList);

    return () => {
      Logger.log("App", "remove 'navigation-changed' listener");
      unregister.remove();
    }

  }, []);

  useEffect(() => {
    if(ScrollToEndValue){
      Logger.log("App", "scrollToBottom was changed: " + ScrollToEndValue)
      scrollViewRef.current?.scrollToEnd({animated:true});
      //dispatch(resetScroll(viewState));
      ViewProducer.resetScroll();
    }
  },[ScrollToEndValue]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    //backgroundColor: "red",//isDarkMode ? Colors.darker : Colors.lighter,
    display: "flex"
  };

  let title = "N/A";
  let page = <></>;
  if(visiblePage) {
    switch (visiblePage.key) {
      case Page.LevelsList:
        page = <LevelsList key="LevelsList" levels={levels_en_he} lastCompleted={-1}></LevelsList>
        title = "Levels List";
        break;
      case Page.StoryLineActivity:
        page = <StoryLineActivity key={visiblePage.args.id} model={visiblePage.args}></StoryLineActivity>
        title = "Story Activity";
        break;
      case Page.StoryActivity:
        page = <StoryActivity key={visiblePage.args.id} model={visiblePage.args}></StoryActivity>
        title = "Story Activity";
        break;
      case Page.SelectTranslationPicActivity:
        page = <SelectTranslationPicActivity key={visiblePage.args.id} model={visiblePage.args}></SelectTranslationPicActivity>
        title = "Where is..."
        break;
    }
  }

  function backButtonClicked(){
    Logger.log("App", "ack button clicked");
    navigatorService.navigate(Page.LevelsList);
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={AppStyles.host}>
        <ScrollView
          ref={scrollViewRef}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={AppStyles.header}>
            <Pressable style={AppStyles.backButton} onPress={backButtonClicked}>
              <Text style={AppStyles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={AppStyles.title}>{title}</Text>
            <Pressable style={AppStyles.backButton} onPress={backButtonClicked}>
              <Text style={AppStyles.backButtonText}>Menu</Text>
            </Pressable>
          </View>

          {page}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
