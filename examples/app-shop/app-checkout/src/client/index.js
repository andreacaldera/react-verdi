import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import { get } from 'lodash';
import { Provider } from 'react-redux';

import { clientManager, history } from 'react-verdi';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { NAMESPACE } from '../common/modules/constants';

import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PATTERN,
  APP_NAME,
} from '../common/constants';

const { register, appManager, logger, reactVerdiMiddleware } = clientManager({
  appName: APP_NAME,
  reduxStateId: APP_REDUX_STATE_ID,
  pattern: APP_PATTERN,
  appContainerId: APP_CONTAINER_ID,
  lazyLoading: false,
  namespace: NAMESPACE,
});

logger(`Using React version ${React.version}`);

const historyListener = (store) => ({ pathname }) => {
  const previsousPathname = get(
    store.getState(),
    'routing.locationBeforeTransitions.pathname'
  );
  if (previsousPathname !== pathname) {
    logger(
      `Detected external route change, refreshing internal route to ${pathname}`
    );
    store.dispatch(push(pathname));
  }
};

const configureApp = (state) => {
  logger('Configuring app');
  const store = configureStore(
    browserHistory,
    state,
    true,
    reactVerdiMiddleware
  );
  const synedHistory = syncHistoryWithStore(browserHistory, store);
  appManager.synedHistory = synedHistory;
  history.listen(historyListener(store));
  synedHistory.listen(({ pathname }) => {
    history.replace(pathname);
    logger(`Detected sync history change ${pathname}`);
  });
  appManager.store = store;
};

function getApp() {
  const App = () => (
    <Provider store={appManager.store}>
      <Router history={appManager.synedHistory} routes={routes} />
    </Provider>
  );
  return App;
}

register({ getApp, configureApp });
