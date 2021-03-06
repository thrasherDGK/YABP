import React from 'react';
import ReactDOM from 'react-dom';
import { Router, match } from 'react-router';
import { Provider } from 'react-redux';

import history from 'helpers/history';
import prepareData from 'helpers/prepareData';

import routes from 'routes';
import createStore from 'store';

import DevTools from 'containers/DevTools';

const store = createStore(window.__INITIAL_STATE__);

function historyCallback(location) {
  match({ location, routes }, (error, redirect, state) => {
    if (!error && !redirect) {
      prepareData(store, state);
    }
  });

  return true;
}

history.listenBefore(historyCallback);
historyCallback(window.location);

const App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

ReactDOM.render(
  <DevTools store={store} />,
  document.getElementById('devtools'),
  () => {
    delete window.__INITIAL_STATE__;
  },
);

export default App;
