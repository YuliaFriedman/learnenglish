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
import { appProducer } from "../../app-data/store/AppProducer";
import { Logger } from "../../../logger/Logger";
import { navigatorService } from "../../../routing/AppNavigatorService";
import { WordsAppPages } from "../../navigation/WordsAppPages";
import { CategoryCard } from "./category-card/CategoryCard.component.tsx";

function AllCategoriesComponent(): React.JSX.Element {

  const logSource = "AllCategories";

  const [allCategoriesView, setAllCategoriesView] = useState<React.ReactNode[]>([]);

  //const allCategories: Category[] = appProducer.getCategoriesList();


  useEffect(() =>{
    buildCategoriesView();
  }, [])

  useEffect(() => {
    buildCategoriesView();
  }, appProducer.getCategoriesList());

  function buildCategoriesView(){
    const allCategories = appProducer.getCategoriesList();
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
    appProducer.setSelectedCategory(category.id);
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
