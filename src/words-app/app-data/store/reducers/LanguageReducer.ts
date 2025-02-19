import { createSlice } from "@reduxjs/toolkit";
import { Languages } from "../../../../app-data/language.ts";

export interface LanguageState {
  currentLanguage: Languages;
  currentTranslation: Languages;
}

const initialState:LanguageState = {
  currentLanguage: Languages.EN,
  currentTranslation: Languages.HE
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
