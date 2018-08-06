import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../modules';
import checkoutSagas from '../modules/checkout-sagas';

const configureStore = ({ state, reactVerdiMiddleware, useLogger }) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    reactVerdiMiddleware,
    useLogger && createLogger,
  ].filter(Boolean);

  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(checkoutSagas);

  return store;
};

export default configureStore;
