import { createSlice } from "@reduxjs/toolkit";

export interface ViewState{
  shouldScrollToEnd: boolean;
}

const initialState:ViewState = {
  shouldScrollToEnd: false,
}

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setScrollToEnd: (state:ViewState) => {
      state.shouldScrollToEnd = true;
    },
    resetScroll: (state:ViewState) => {
      state.shouldScrollToEnd = false;
    }
  }
});

export const { setScrollToEnd, resetScroll } = viewSlice.actions;

export default viewSlice.reducer;
