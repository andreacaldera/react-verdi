import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';

import reducer from '../modules';

const configureStore = ({
  history,
  state,
  useLogger,
  reactVerdiMiddleware,
}) => {
  const router = routerMiddleware(history);

  const middlewares = [
    router,
    reactVerdiMiddleware,
    useLogger && createLogger,
  ].filter(Boolean);

  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
