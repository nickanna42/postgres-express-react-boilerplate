/**
*** This file handles all calls to external API's.
*** All function exported from here should be
*** asyncronous. Async calls are handled as `thunks`,
*** and update the redux state themselves.
**/
import { AppDispatch, AppGetState } from '../reduxElements';
import {
  incUiBusy,
  decUiBusy,
  addUiError,
} from '../reduxElements/remotingState';

export const fetchWrapper = <T= any>(url: RequestInfo | URL, options: RequestInit={}) => async (dispatch: AppDispatch) =>{
  dispatch(incUiBusy());
  let output: T | undefined = undefined;
  try {
    output = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }, 
    }).then(res => res.json() as Promise<T>);
  } catch (err: any) {
    dispatch(addUiError(`Call to '${url}' failed\n${err?.statusCode} - ${err?.statusText}`));
  }
 
  dispatch(decUiBusy())

  return output;
}

export const exampleFetch = () => async (dispatch:AppDispatch, _getState: AppGetState ) => {
  const results = await dispatch(fetchWrapper<string>('/api/example'))
  // const results = 'hello';

  return results;
};
