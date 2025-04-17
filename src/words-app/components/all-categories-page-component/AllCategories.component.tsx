/**
 * Sample React Native GameContainerComponent
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { AllCategoriesStyling } from "./AllCategories.styling";
import { Category } from "../../app-data/models/CategoryModel";
import { Logger } from "../../../logger/Logger";
import { CategoryCard } from "./category-card/CategoryCard.component.tsx";
import { RoutesListValues } from "../../app-data/models/routeValues.ts";
import { useSelector } from "react-redux";
import { categoriesListSelector } from "../../app-data/store/AppSelectors.ts";
import { useServices } from "../../dependency-injection/ServicesContext.tsx";

function AllCategoriesComponent(): React.JSX.Element {

  const logSource = "AllCategories";

  const [allCategoriesView, setAllCategoriesView] = useState<React.ReactNode[]>([]);
  const { appProducer } = useServices();
  const categoriesList = useSelector(categoriesListSelector);

  useEffect(() =>{
    buildCategoriesView();
  }, [])

  useEffect(() => {
    buildCategoriesView();
  }, [categoriesList]);

  function buildCategoriesView(){
    setAllCategoriesView(categoriesList
      ? categoriesList.map((category, index) => {
          Logger.debug(logSource, "Next Category: " + category.title + ", icon = " + category.icon + " style = " + JSON.stringify(category.style));
          return (
            <CategoryCard key={'category_' + index} category={category} onPress={() => categoryPressed(category)}></CategoryCard>
          )
        })
      : []);
  }

  function categoryPressed(category:Category){
    Logger.log(logSource, "Category pressed: " + category.title);
    appProducer.setSelectedCategory(category.type);
    appProducer.setNavigationRoute(RoutesListValues.steps)
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
