import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import superagent from 'superagent';

import { clientManager } from 'react-verdi';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';

import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PATTERN,
  APP_NAME,
} from '../common/constants';

const { register, history, appManager } = clientManager({
  appName: APP_NAME,
  reduxStateId: APP_REDUX_STATE_ID,
  pattern: APP_PATTERN,
  appContainerId: APP_CONTAINER_ID,
});

const fetchData = () =>
  // TODO fix this, child app might run on different host / port
  superagent(`${window.location.href}`).set('Accept', 'application/json');

const getApp = () => {
  const App = () => (
    <Provider store={appManager.store}>
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Provider>
  );
  return App;
};

const configureApp = (state) => {
  const store = configureStore(state, true, clientSagas);
  appManager.store = store;
};

register({ getApp, configureApp, fetchData });
