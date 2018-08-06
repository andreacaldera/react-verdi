import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from '../modules';
import sagas from '../modules/sagas';

const configureStore = ({ state, useLogger = false, clientSagas }) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, useLogger && createLogger].filter(Boolean);

  const store = createStore(reducer, state, compose(applyMiddleware(...middlewares)));

  sagaMiddleware.run(sagas);
  if (clientSagas) {
    sagaMiddleware.run(clientSagas);
  }

  return store;
};

export default configureStore;
