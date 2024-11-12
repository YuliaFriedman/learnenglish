import { createSlice } from "@reduxjs/toolkit";
import { StepModel } from "../../models/StepModel";
import { Logger } from "../../../../logger/Logger";

const logSource = "StepsReducer";

export interface StepsState {
  currentStep: number | null;
  allSteps: Record<string, StepModel[]>;
}

const initialState:StepsState = {
  currentStep: null,
  allSteps: {}
}

export const categoriesSlice = createSlice<StepsState>({
  name: "steps",
  initialState,
  reducers:{
    setSelectedStep: (state: StepsState, {payload}) => {
      state.currentStep = payload;
    },
    setAllSteps: (state: StepsState, {payload}) => {
      Logger.log(logSource, "In setAllSteps reducer, payload = ",false,payload);
      state.allSteps = payload;
    }
  }
});

export const {setSelectedStep, setAllSteps} = categoriesSlice.actions;
export default categoriesSlice.reducer;
