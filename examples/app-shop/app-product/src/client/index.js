import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import superagent from 'superagent';
import { renderRoutes } from 'react-router-config';

import { clientManager } from 'react-verdi';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';

import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PATTERN,
  APP_NAME,
  APP_PORT,
} from '../common/constants';

const basePath = `http://localhost:${APP_PORT}`; // TODO remove host:port dependency

const { register, history, appManager, logger } = clientManager({
  appName: APP_NAME,
  reduxStateId: APP_REDUX_STATE_ID,
  pattern: APP_PATTERN,
  appContainerId: APP_CONTAINER_ID,
});

const getApp = () => {
  const App = () => (
    <Provider store={appManager.store}>
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Provider>
  );
  return App;
};

function configureApp(state) {
  const store = configureStore(state, true, clientSagas);
  appManager.store = store;
}

const fetchData = () => {
  logger('fetching data');
  return superagent(`${basePath}${window.location.pathname}`)
    .set('Accept', 'application/json')
    .then(({ body }) => body);
};

register({ getApp, configureApp, fetchData });
