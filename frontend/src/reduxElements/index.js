/**
Redux boostrapping. Sets the initial state.
Also provides the 'reducer' which takes 'actions` and returns
a new, updated state to the redux store
**/

// Initial State
const initState = {
  uiBusy: 0,
  uiErrors: []
};

// This is the reducer
export default function(state = initState, action) {
  switch(action.type) {
    case 'INC_UI_BUSY':
      return {
        ...state,
        uiBusy: state.uiBusy + 1,
      };
    
    case 'DEC_UI_BUSY':
      return {
        ...state,
        uiBusy: state.uiBusy - 1,
      };

    case 'ADD_UI_ERROR':
      return {
        ...state,
        uiErrors: [
          ...state.uiErrors,
          action.data,
        ]
      };
    
    case 'REMOVE_UI_ERROR':
      return {
        ...state,
        uiErrors: state.uiErrors.filter((a, i) => i !== action.data),
      };
    
    default:
      return state;
  }
}