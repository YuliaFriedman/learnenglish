/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, Text, useColorScheme, View } from "react-native";
import { AllCategoriesStyling } from "./AllCategories.styling";
import { Category } from "../../app-data/models/CategoryModel";
import { images } from "../../app-data/ImagesManager";
import { Logger } from "../../../logger/Logger";
import { navigatorService } from "../../../routing/AppNavigatorService";
import { WordsAppPages } from "../../navigation/WordsAppPages";
import { CategoryCard } from "./category-card/CategoryCard.component.tsx";
import InjectionManager from "../../../core/services/InjectionManager.ts";
import { IAppProducer } from "../../app-data/store/IAppProducer.ts";
import { DepInjectionsTokens } from "../../dependency-injection/DepInjectionTokens.ts";

function AllCategoriesComponent(): React.JSX.Element {

  const logSource = "AllCategories";

  const [allCategoriesView, setAllCategoriesView] = useState<React.ReactNode[]>([]);
  const appProducer = useRef<IAppProducer | null>(null);

  //const allCategories: Category[] = appProducer.getCategoriesList();

  useEffect(() =>{
    initInjections();
    buildCategoriesView();
  }, [])

  useEffect(() => {
    buildCategoriesView();
  }, appProducer.current?.getCategoriesList());

  function initInjections(){
    if(!appProducer.current){
      appProducer.current = InjectionManager.useInjection<IAppProducer>(DepInjectionsTokens.APP_PRODUCER_TOKEN);
    }
  }

  function buildCategoriesView(){
    const allCategories = appProducer.current?.getCategoriesList();
    Logger.log(logSource, "categories changed: ", false, allCategories)
    setAllCategoriesView(allCategories
      ? allCategories.map((category, index) => {
          Logger.log(logSource, "Next Category: " + category.title + ", icon = " + category.icon + " style = " + JSON.stringify(category.style));
          return (
            <CategoryCard key={'category_' + index} category={category} onPress={() => categoryPressed(category)}></CategoryCard>
          )
        })
      : []);
  }

  function categoryPressed(category:Category){
    appProducer.current?.setSelectedCategory(category.type);
    navigatorService.navigate(WordsAppPages.steps);
  }

  return (
    <View style={AllCategoriesStyling.testContainer}>
      <View style={AllCategoriesStyling.column}>
        {allCategoriesView.slice(0, allCategoriesView.length/2)}
      </View>
      <View style={AllCategoriesStyling.column}>
        {allCategoriesView.slice(allCategoriesView.length/2, allCategoriesView.length)}
      </View>
    </View>
  );
}

export default AllCategoriesComponent;
