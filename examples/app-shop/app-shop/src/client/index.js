import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { portalManager } from 'react-verdi';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import clientSagas from './client-sagas';
import { APP_NAME, APP_CONTAINER_ID } from '../common/constants';

const { history } = portalManager(APP_NAME);

const store = configureStore({
  state: window.__PARENT_APP_INITIAL_STATE__,
  useLogger: true,
  clientSagas,
});

const AppRouter = () => (
  <Provider store={store}>
    <Router history={history}>{renderRoutes(routes)}</Router>
  </Provider>
);
AppRouter.displayName = APP_NAME;
render(<AppRouter />, document.getElementById(APP_CONTAINER_ID));
