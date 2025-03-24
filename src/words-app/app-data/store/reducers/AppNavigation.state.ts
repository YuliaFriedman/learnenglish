import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Logger } from "../../../../logger/Logger.ts";
import { RoutesListValues } from "../../models/routeValues.ts";

export type NestedParamsType = {
  screen: RoutesListValues;
  params?: ParamsType;
};

export type ParamsType = null | undefined | object | NestedParamsType;

interface RouteParams {
  routeName: RoutesListValues;
  params: ParamsType
}

interface NavigationState {
  currentRoute: RouteParams;
}

const initialState: NavigationState = {
  currentRoute: {
    routeName: RoutesListValues.categories,
    params: null,
  }
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentRoute(state, action: PayloadAction<RouteParams>) {
      Logger.log("setCurrentRoute", "action = " + JSON.stringify(action));
      state.currentRoute.routeName = action.payload.routeName;
      state.currentRoute.params = action.payload.params;
    },
  },
});

export const { setCurrentRoute } = navigationSlice.actions;
export default navigationSlice.reducer;
