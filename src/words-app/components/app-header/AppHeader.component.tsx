/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView, Text, useColorScheme, View } from "react-native";
import { categories } from "../../app-data/levels/Categories";
import { AppHeaderStyling } from "./AppHeader.styling";
import { AppHeaderModel } from "./AppHeaderModel";
import { navigatorService } from "../../../routing/AppNavigatorService";
import { WordsAppPages } from "../../navigation/WordsAppPages";
import { Logger } from "../../../logger/Logger";


function AppHeaderComponent(model : AppHeaderModel): React.JSX.Element {

  const logSource = "AppHeader";

  function navigateHome(){
    Logger.log(logSource, "Navigating home")
    navigatorService.navigate(WordsAppPages.categories);
  }

  return (
    <View style={AppHeaderStyling.host}>
      <View><Pressable onPress={navigateHome} style={AppHeaderStyling.homeButton}><Text>Home</Text></Pressable></View>
      <Text style={AppHeaderStyling.title}>{model.title}</Text>
      <View></View>
    </View>
  );
}

export default AppHeaderComponent;
