import { createSlice } from "@reduxjs/toolkit";
import { Category, CategoryType } from "../../models/CategoryModel";

export type SelectedCategory = CategoryType|null;

export interface CategoriesState {
  selectedCategory: SelectedCategory;
  categoriesList: Category[];
}

const initialState:CategoriesState = {
  categoriesList:[],
  selectedCategory: null
}

// @ts-ignore
export const categoriesSlice = createSlice<CategoriesState>({
  name: "categories",
  initialState,
  reducers:{
    setSelectedCategory: (state: CategoriesState, {payload}) => {
      state.selectedCategory = payload;
    },
    setCategoriesList: (state: CategoriesState, {payload}) => {
      state.categoriesList = payload;
    }
  }
});

export const {setSelectedCategory, setCategoriesList} = categoriesSlice.actions;
export default categoriesSlice.reducer;
