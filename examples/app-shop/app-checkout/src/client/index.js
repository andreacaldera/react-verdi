import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import { get } from 'lodash';
import { Provider } from 'react-redux';
// import superagent from 'superagent';

import { clientManager, history } from 'react-verdi';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';

import {
  APP_CONTAINER_ID,
  APP_REDUX_STATE_ID,
  APP_PATTERN,
  APP_NAME,
} from '../common/constants';

const { register, appManager, logger } = clientManager({
  appName: APP_NAME,
  reduxStateId: APP_REDUX_STATE_ID,
  pattern: APP_PATTERN,
  appContainerId: APP_CONTAINER_ID,
});

logger(`Using React version ${React.version}`);

// const basePath = `http://localhost:${APP_PORT}`; // TODO remove host:port dependency

const configureApp = (state) => {
  const store = configureStore(browserHistory, state, true, clientSagas);
  const synedHistory = syncHistoryWithStore(browserHistory, store);
  appManager.synedHistory = synedHistory;
  history.listen(({ pathname }) => {
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

// function mount(location = window.location.pathname) {
//   if (!isActive(location)) {
//     debug('not mounting: inactive');
//     return;
//   }
//
//   if (appCheckoutManager.isActive) {
//     debug('not mounting, already active');
//     return;
//   }
//   debug('mount');
//   appCheckoutManager.isActive = true;
//   return Promise.resolve()
//     .then(() => {
//       if (appCheckoutManager.initialised) {
//         debug('already initialised');
//         return renderApp();
//       }
//       // superagent(`${basePath}${location}`)
//       //   .set('Accept', 'application/json')
//       //   .then(({ body }) => {
//       //     initialiseApp(body);
//       //     return renderApp();
//       //   });
//     })
//     .then(() =>
//       appCheckoutManager.history.replace(window.location))
// }

// if (!appCheckoutManager.lazyLoad || window[APP_REDUX_STATE_ID]) {
//   initialiseApp(window[APP_REDUX_STATE_ID] || {});
// }

// const fetchData = () =>
//   superagent(`${basePath}${location}`)
//     .set('Accept', 'application/json');

register({ getApp, configureApp });
