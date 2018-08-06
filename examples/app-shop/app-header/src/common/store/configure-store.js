import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import reducer from '../modules';

const configureStore = ({ state, useLogger = false, reactVerdiMiddleware }) => {
  const middlewares = [useLogger && createLogger, reactVerdiMiddleware].filter(
    Boolean
  );

  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(...middlewares))
  );

  return store;
};

export default configureStore;
