import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import superagent from 'superagent';
import { renderRoutes } from 'react-router-config';
import createLogger from 'redux-logger';

import { clientManager } from 'react-verdi';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';

import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PATTERN,
  APP_NAME,
  APP_PORT,
} from '../common/constants';
import { NAMESPACE, ROUTE_CHANGED } from '../common/modules/constants';
// import { getBaseUrl } from '../common/modules/selectors';

const {
  register,
  history,
  appManager,
  logger,
  publisherMiddleware,
  subscriberMiddleware,
  historyMiddleware,
} = clientManager({
  appName: APP_NAME,
  reduxStateId: APP_REDUX_STATE_ID,
  pattern: APP_PATTERN,
  appContainerId: APP_CONTAINER_ID,
  namespace: NAMESPACE,
  routeChangedActionType: ROUTE_CHANGED,
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
  const store = configureStore({
    state,
    middlewares: [
      createLogger,
      publisherMiddleware,
      subscriberMiddleware,
      historyMiddleware,
    ],
  });
  appManager.store = store;
}

const fetchData = () => {
  const baseUrl = window.APP_PRODUCT_BASE_URL || `http://localhost:${APP_PORT}`; // TODO remove this horrible hack!
  logger('fetching data', baseUrl);
  return superagent(`${baseUrl}${window.location.pathname}`)
    .set('Accept', 'application/json')
    .then(({ body }) => body);
};

register({ getApp, configureApp, fetchData });
