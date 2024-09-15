/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, useColorScheme, Text, View, Pressable } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { LevelsList } from "./src/levels screen/LevelsList";
import { StoryActivity} from "./src/activities/story/StoryActivity";
import { Page } from "./src/routing/AppNavigatorService";
import { navigatorService } from "./src/routing/AppNavigatorService";
import { PageInfo } from "./src/routing/AppNavigatorService";
import { AppStyles } from "./App.Styling";
import { levels_en_he } from "./src/app-data/levels/en-he/Levels_en_he";
import { StoryActivityModel } from "./src/activities/story/StoryActivityModel";
import { AudioManager } from "./src/sound/AudioManager";

function App(): React.JSX.Element {
  console.log("====================");
  console.log("IN App...");
  console.log("====================");

  const [visiblePage, setVisiblePage] = useState<PageInfo|undefined>(navigatorService.getVisible());

  useEffect(() => {
    AudioManager.init();
    const handleNavigation = (page:PageInfo) =>{
      console.log("App: navigation changed: in page " + page.key);
      setVisiblePage(page);
    }

    console.log("App: register to 'navigation-changed'");
    const unregister = navigatorService.addListener('navigation-changed', handleNavigation);

    navigatorService.registerPage(Page.LevelsList);
    navigatorService.registerPage(Page.StoryActivity);
    navigatorService.navigate(Page.LevelsList);

    return () => {
      console.log("App: remove 'navigation-changed' listener");
      unregister.remove();
    }

  }, []);

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
        page = <LevelsList levels={levels_en_he} lastCompleted={-1}></LevelsList>
        title = "Levels List";
        break;
      case Page.StoryActivity:
        const model = visiblePage.args as StoryActivityModel;
        page = <StoryActivity model={model}></StoryActivity>
        title = "Story Activity";
        break;
    }
  }

  function backButtonClicked(){
    console.log("App: back button clicked");
    navigatorService.navigate(Page.LevelsList);
  }

  return (
    <>
    <SafeAreaView style={AppStyles.host}>
      <ScrollView
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
    </>
  );
}

export default App;
