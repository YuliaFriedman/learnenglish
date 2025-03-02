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
import LinearGradient from "react-native-linear-gradient";
import { ThemeManager } from "../../style/ThemeManager.ts";
import { IconButton } from "../../../core/components/icon-button/IconButton.tsx";
import { GradientLayout } from "../../../core/components/gradient-layout/GradientLayout.tsx";


function AppHeaderComponent(model : AppHeaderModel): React.JSX.Element {

  const logSource = "AppHeader";

  function navigateHome(){
    Logger.log(logSource, "Navigating home")
    navigatorService.navigate(WordsAppPages.categories);
  }

  return (
    <View style={AppHeaderStyling.headerBorder}>
      <GradientLayout model={ThemeManager.theme.header.bg} style={AppHeaderStyling.innerWrapper}>
        <View style={AppHeaderStyling.host}>
          <View style={AppHeaderStyling.leftPart}>
            <IconButton style={AppHeaderStyling.homeButton} onPress={navigateHome} icon="home" size={30}></IconButton>
          </View>
          <Text style={AppHeaderStyling.title}>{model.title}</Text>
          <View style={AppHeaderStyling.rightPart}></View>
        </View>
      </GradientLayout>
    </View>
  );
}

export default AppHeaderComponent;
