import { createSlice } from "@reduxjs/toolkit";
import { GameModel } from "../../models/GameModel.ts";

export interface CurrentGameState {
  currentGame: GameModel | undefined;
}

const initialState:CurrentGameState = {
  currentGame: undefined,
}

// @ts-ignore
export const currentGameReducer = createSlice<CurrentGameState>({
  name: "currentGame",
  initialState,
  reducers:{
    setCurrentGame: (state: CurrentGameState, {payload}) => {
      state.currentGame = payload;
    }
  }
});

export const { setCurrentGame} = currentGameReducer.actions;
export default currentGameReducer.reducer;
