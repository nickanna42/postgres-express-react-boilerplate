/**
Redux boostrapping. Sets the initial state.
Also provides the 'reducer' which takes 'actions` and returns
a new, updated state to the redux store
**/
import { TypedUseSelectorHook, useDispatch as useDefaultDispatch, useSelector as useDefaultSelector} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import { REMOTING_STATE, remotingStateReducer } from './remotingState';



export const store = configureStore({
  reducer: {
    [REMOTING_STATE]: remotingStateReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppGetState = typeof store.getState;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useDefaultDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector

export const selectRootState = (state: RootState) => state;