import viewReducer from "./ViewReducer";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    view: viewReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store;
