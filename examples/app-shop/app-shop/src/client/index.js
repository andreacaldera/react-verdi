import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { portalManager } from 'react-verdi';
import createLogger from 'redux-logger';

import configureStore from '../common/store/configure-store';
import routes from '../common/routes';
import { APP_NAME, APP_CONTAINER_ID } from '../common/constants';
import { NAMESPACE } from '../common/modules/constants';
import { ROUTE_CHANGED } from '../../node_modules/react-verdi/examples/app-shop/app-shop/src/common/modules/meta/constants';

const { history, logger, reactVerdiMiddleware, portalMiddleware } = portalManager({
  appName: APP_NAME,
  namespace: NAMESPACE,
  routeChangedActionType: ROUTE_CHANGED,
});

logger(`React version: $${React.version}`);

const store = configureStore({
  state: window.__PARENT_APP_INITIAL_STATE__,
  clientMiddlewares: [reactVerdiMiddleware, portalMiddleware, createLogger],
});

const AppRouter = () => (
  <Provider store={store}>
    <Router history={history}>{renderRoutes(routes)}</Router>
  </Provider>
);
AppRouter.displayName = APP_NAME;
render(<AppRouter />, document.getElementById(APP_CONTAINER_ID));
