import { createSlice } from "@reduxjs/toolkit";

export interface LanguageState {
  currentLanguage: string;
  currentTranslation: string;
}

const initialState:LanguageState = {
  currentLanguage: "en",
  currentTranslation: "he"
}

export const languageSlice = createSlice<LanguageState>({
  name: "language",
  initialState,
  reducers: {
    setSelectedStep: (state: LanguageState, {payload}) => {
      state.currentLanguage = payload;
    }
  }
});

export const {setSelectedStep} = languageSlice.actions;
export default  languageSlice.reducer;
