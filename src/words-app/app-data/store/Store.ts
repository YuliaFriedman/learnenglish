import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categoriesReducer from "./reducers/CategoriesReducer";
import stepsReducer from "./reducers/StepsReducer";
import languageReducer from "./reducers/LanguageReducer";
import navigationReducer from "./reducers/AppNavigation.state.ts";
import currentGameReducer from "./reducers/CurrentGameReducer.ts";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    steps: stepsReducer,
    language: languageReducer,
    navigation: navigationReducer,
    currentGame: currentGameReducer
  }
});


export type AppState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
// @ts-ignore
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
