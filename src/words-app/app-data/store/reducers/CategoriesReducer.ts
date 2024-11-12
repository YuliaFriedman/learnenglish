import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models/CategoryModel";

export interface CategoriesState {
  selectedCategory: string | null;
  categoriesList: Category[];
}

const initialState:CategoriesState = {
  categoriesList:[],
  selectedCategory: null
}

export const categoriesSlice = createSlice<CategoriesState>({
  name: "categories",
  initialState,
  reducers:{
    setSelectedCategory: (state: CategoriesState, {payload}) => {
      state.selectedCategory = payload;
    },
    setCategoriesList: (state: CategoriesState, {payload}) => {
      console.log("@@@ In setCategoriesList",payload);
      state.categoriesList = payload;
    }
  }
});

export const {setSelectedCategory, setCategoriesList} = categoriesSlice.actions;
export default categoriesSlice.reducer;
