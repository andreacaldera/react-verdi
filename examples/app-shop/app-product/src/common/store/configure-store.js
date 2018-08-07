import { createStore, compose, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import reducer from '../modules';
import checkoutSagas from '../modules/checkout-sagas';

const configureStore = ({ state, middlewares = [] }) => {
  const sagaMiddleware = createSagaMiddleware();
  const activeMiddlewares = [sagaMiddleware, ...middlewares.filter(Boolean)];

  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(...activeMiddlewares))
  );

  sagaMiddleware.run(checkoutSagas);

  return store;
};

export default configureStore;
