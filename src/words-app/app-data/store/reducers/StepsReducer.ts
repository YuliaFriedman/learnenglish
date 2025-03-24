import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StepModel, StepStatus } from "../../models/StepModel";
import { Logger } from "../../../../logger/Logger";
import { StepsModel } from "../../models/AppDataModel.ts";
import { currentStepSelector } from "../AppSelectors.ts";
import store, { AppState } from "../Store.ts";

const logSource = "StepsReducer";

export interface StepStatusModel {
  stepId: number;
  status: StepStatus;
}

export interface StepsState {
  currentStep: number | null;
  allSteps: StepsModel;
}

const initialState:StepsState = {
  currentStep: null,
  allSteps: {}
}

// @ts-ignore
export const categoriesSlice = createSlice<StepsState>({
  name: "steps",
  initialState,
  reducers:{
    updateStepStatus: (state: StepsState, action: PayloadAction<StepStatusModel>) => {
      const currentStep = currentStepSelector(store.getState() as AppState);
      if (currentStep) {
        currentStep.status = action.payload.status;
      }
    },
    setSelectedStep: (state: StepsState, action: PayloadAction<number | null>) => {
      Logger.log(logSource, "In setSelectedStep: step = " + (action.payload != null ? action.payload : "undefined"));
      state.currentStep = action.payload;
    },
    setAllSteps: (state: StepsState, action: PayloadAction<StepsModel>) => {
      Logger.debug(logSource, "In setAllSteps reducer, payload = ",false,action.payload);
      state.allSteps = action.payload;
    }
  }
});

export const {setSelectedStep, setAllSteps} = categoriesSlice.actions;
export default categoriesSlice.reducer;
