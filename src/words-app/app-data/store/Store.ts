import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categoriesReducer from "./reducers/CategoriesReducer";
import stepsReducer from "./reducers/StepsReducer";
import languageReducer from "./reducers/LanguageReducer";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    steps: stepsReducer,
    language: languageReducer
  }
});


export type AppState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
