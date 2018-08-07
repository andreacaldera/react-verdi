import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../modules';

const configureStore = ({ state, clientMiddlewares = [] }) => {
  const middlewares = clientMiddlewares.filter(Boolean);
  const store = createStore(reducer, state, compose(applyMiddleware(...middlewares)));
  return store;
};

export default configureStore;
