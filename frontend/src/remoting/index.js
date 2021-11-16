/**
*** This file handles all calls to external API's.
*** All function exported from here should be
*** asyncronous. Async calls are handled as `thunks`,
*** and update the redux state themselves.
**/

import {
  incUiBusy,
  decUiBusy,
  addUiError
} from '../reduxElements/actions';

const fetchWrapper = (url, options={}) => async (dispatch) =>{
  dispatch(incUiBusy);
  try {
    const output = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }, 
    });
  } catch (err) {
    dispatch(addUiError({
      title: `Call to '${url}' failed`,
      description: `${err.statusCode} - ${err.statusText}`,
    }));
  }
 
  dispatch(decUiBusy)

  return output;
}

export const exampleFetch = () => async (dispatch, getState ) =>{
    // fetch data here. Use `await dispatch(fetchWrapper())`
    const results = await dispatch(fetchWrapper(
      '/example'
    )).then(res => res.json());

    return results;
  };
