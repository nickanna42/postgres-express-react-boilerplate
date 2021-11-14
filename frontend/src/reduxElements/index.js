/**
Redux boostrapping. Sets the initial state.
Also provides the 'reducer' which takes 'actions` and returns
a new, updated state to the redux store
**/

// Initial State
const initState = {};

// This is the reducer
export default function(state = initState, action) {
  switch(action.type) {
    default:
      return state;
  }
}