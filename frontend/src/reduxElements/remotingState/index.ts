import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

// Initial State
type RemotingState = {
  uiBusy: number;
  uiErrors: string[];
}

const initialState = {
  uiBusy: 0,
  uiErrors: [] as string[]
} as RemotingState;

export const REMOTING_STATE = 'remotingState';

const remotingSlice = createSlice({
  name: REMOTING_STATE,
  initialState,
  reducers: {
    incUiBusy: (state) => ({
      ...state,
      uiBusy: state.uiBusy + 1,
    }),
    decUiBusy: (state) => ({
      ...state,
      uiBusy: state.uiBusy - 1,
    }),
    addUiError: (state, action: PayloadAction<string>) => ({
      ...state,
      uiErrors: [ ...state.uiErrors, action.payload],
    }),
    removeUiErrors: (state, action: PayloadAction<number>) => ({
      ...state,
      uiErrors: state.uiErrors.filter((_a, i) => i !== action.payload)
    }),
  },
})

export const remotingStateReducer = remotingSlice.reducer;

export const {
  incUiBusy, 
  decUiBusy,
  addUiError,
  removeUiErrors,
} = remotingSlice.actions;

const selectRemotingState = ( rootState: RootState ) => rootState[REMOTING_STATE] as RemotingState

export const selectUiBusy = createSelector(
  selectRemotingState,
  (remotingState) => remotingState.uiBusy
);

export const selectUiErrors = createSelector(
  selectRemotingState,
  (remotingState) => remotingState.uiErrors
);

