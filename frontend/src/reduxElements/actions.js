/**
Functions that return actions.
These actions can be `dispatched` by mapping them
to a property of a react component.
**/

export const incUiBusy = () => ({
  type: 'INC_UI_BUSY',
});

export const decUiBusy = () => ({
  type: 'DEC_UI_BUSY',
});

export const addUiError = (newError) => ({
  type: 'ADD_UI_ERROR',
  data: newError,
});

export const removeUiError = (errorIndex) => ({
  type: 'REMOVE_UI_ERROR',
  data: errorIndex,
});