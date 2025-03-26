/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView, Text, useColorScheme, View } from "react-native";
import { AppHeaderStyling } from "./AppHeader.styling";
import { AppHeaderModel } from "./AppHeaderModel";
import { Logger } from "../../../logger/Logger";
import { ThemeManager } from "../../style/ThemeManager.ts";
import { IconButton } from "../../../core/components/icon-button/IconButton.tsx";
import { GradientLayout } from "../../../core/components/gradient-layout/GradientLayout.tsx";
import InjectionManager from "../../../core/services/InjectionManager.ts";
import { DepInjectionsTokens } from "../../dependency-injection/DepInjectionTokens.ts";
import { INavigationManager } from "../../navigation/INavigationManager.tsx";
import { IAppProducer } from "../../app-data/store/IAppProducer.ts";


function AppHeaderComponent({title} : AppHeaderModel): React.JSX.Element {

  const logSource = "AppHeader";

  const navigationManager = useRef<INavigationManager>( InjectionManager.useInjection<INavigationManager>(DepInjectionsTokens.NAVIGATION_MANAGER) );
  //const navigationManager = useRef<IAppProducer>( InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN) );
  //
  function navigateHome(){
    Logger.log(logSource, "Navigating home")
    navigationManager.current.navigateHome();

  }

  return (
    <View style={AppHeaderStyling.headerBorder}>
      <GradientLayout model={ThemeManager.theme.header.bg} style={AppHeaderStyling.innerWrapper}>
        <View style={AppHeaderStyling.host}>
          <View style={AppHeaderStyling.leftPart}>
            <IconButton style={AppHeaderStyling.homeButton} onPress={navigateHome} icon="home" size={30}></IconButton>
          </View>
          <Text style={AppHeaderStyling.title}>{title}</Text>
          <View style={AppHeaderStyling.rightPart}></View>
        </View>
      </GradientLayout>
    </View>
  );
}

export default AppHeaderComponent;
