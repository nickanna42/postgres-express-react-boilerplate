// import { useSelector, selectRootState } from './reduxElements';
// import {  } from './styles/commonStyles';
import { lazy as lazyLoader, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "./reduxElements";
import { exampleFetch } from "./remoting";
const ExampleComponent = lazyLoader(() => import('./components/ExampleComponent'));

const App = () => {
  // const rootState = useSelector(selectRootState);
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const results = await dispatch(exampleFetch());
      console.log('fetch results:', results);
    })();
  }, [ dispatch ])

  return (<Suspense fallback={<div />}>
    <BrowserRouter>
      <Routes>
        <Route path={'/example'} element={<ExampleComponent />} />
      </Routes>
    </BrowserRouter>
  </Suspense>);
}

export default App;
